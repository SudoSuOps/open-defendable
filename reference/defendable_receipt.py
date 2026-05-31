"""
defendable_receipt — reference implementation of the Defendable Receipt Standard.

Schema: defendable.receipt/v1
Spec:   open-defendable/RECEIPT-SCHEMA.md
Owner:  OpenDefendable (the open standards layer)

This is THE one module every minter and reader in the house imports, so the
canonicalization + checksum + chain math is byte-identical everywhere. It has
NO third-party dependencies — pure stdlib — so Cloud (FastAPI/orjson), Router
(SQLAlchemy/json), and any reader can vendor it without a dependency fight.

Doctrine: we are math and code. A receipt records the outcome of applying a
declared rulebook. SHA-256 establishes content-integrity and chain-order ONLY —
not authorship, approval, certification, insurance, anchoring, or production
clearance. Anything beyond that is a separate, explicitly-labeled layer.
"""
from __future__ import annotations

import hashlib
import json
from decimal import Decimal
from typing import Any, Iterable

ENVELOPE_SCHEMA = "defendable.receipt/v1"
ZERO_HASH = "0" * 64
CHECKSUM_FIELD = "receipt_sha256"
# Legacy field name still on disk in pre-migration Router JSONL. Readers accept
# both during the cutover (RECEIPT-SCHEMA.md §7); minters only ever write the
# canonical CHECKSUM_FIELD.
LEGACY_CHECKSUM_FIELDS = ("checksum_sha256",)

HOUSE_TYPES = (
    "eval", "cook", "dataset-download", "dataset-promotion", "model-pin",
    "incident", "compute", "job", "retrieval", "deed",
)


# --------------------------------------------------------------------------- #
# Canonicalization (the math the recipient runs)                              #
# --------------------------------------------------------------------------- #

def _normalize(value: Any) -> Any:
    """Coerce values into canonical form before serialization.

    - Decimal / money -> fixed 2-decimal string ("6.00"), never a float.
    - dict -> recursively normalized (keys sorted at dump time).
    - list/tuple -> recursively normalized list.
    Datetimes must be pre-rendered to ISO-8601 strings by the caller.
    """
    if isinstance(value, Decimal):
        return f"{value:.2f}"
    if isinstance(value, dict):
        return {k: _normalize(v) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [_normalize(v) for v in value]
    if isinstance(value, float):
        # Floats are not allowed for money; reject loudly rather than mint a
        # checksum that won't reproduce. Use Decimal or a 2dp string upstream.
        raise TypeError(
            "float is not canonicalizable (non-deterministic); pass Decimal "
            "or a pre-formatted string for money/amounts"
        )
    return value


def canonical_bytes(body: dict) -> bytes:
    """Canonical JSON bytes: sorted keys, no whitespace, UTF-8.

    Identical bytes to defendable-cloud-v2 app/hashing.py (orjson OPT_SORT_KEYS)
    and defendable-router core/receipts.py canonical_json.
    """
    return json.dumps(
        _normalize(body),
        sort_keys=True,
        separators=(",", ":"),
        ensure_ascii=True,
    ).encode("utf-8")


def receipt_sha256(receipt: dict) -> str:
    """SHA-256 over the canonical body = the full receipt minus its own checksum.

    The checksum is appended AFTER hashing, so it is never part of the body.
    seq and parent_hash ARE inside the body — that is what makes the link
    tamper-evident.
    """
    body = {k: v for k, v in receipt.items() if k not in _all_checksum_fields()}
    return hashlib.sha256(canonical_bytes(body)).hexdigest()


def _all_checksum_fields() -> tuple[str, ...]:
    return (CHECKSUM_FIELD, *LEGACY_CHECKSUM_FIELDS)


def stored_checksum(receipt: dict) -> str | None:
    """Read the checksum regardless of field name (canonical or legacy)."""
    for field in _all_checksum_fields():
        if field in receipt and receipt[field]:
            return receipt[field]
    return None


# --------------------------------------------------------------------------- #
# Minting                                                                     #
# --------------------------------------------------------------------------- #

def receipt_id(seq: int, entropy_hex8: str) -> str:
    """DCR-{seq:06d}-{hex8}. `entropy_hex8` must be 8 hex chars from the caller's
    RNG (kept out of this module so the math stays deterministic/testable)."""
    if len(entropy_hex8) != 8 or any(c not in "0123456789abcdef" for c in entropy_hex8):
        raise ValueError("entropy_hex8 must be exactly 8 lowercase hex chars")
    return f"DCR-{seq:06d}-{entropy_hex8}"


def mint(
    *,
    receipt_type: str,
    chain_id: str,
    seq: int,
    parent_hash: str,
    created_at: str,
    subject: dict,
    payload: dict,
    entropy_hex8: str,
    amount_usd: Decimal | str | None = None,
    metadata: dict | None = None,
) -> dict:
    """Build a fully-formed, checksummed defendable.receipt/v1 envelope.

    The caller owns: seq allocation (collision-safe per chain_id), parent_hash
    (= prior receipt's receipt_sha256, or ZERO_HASH at genesis), created_at
    (ISO-8601 UTC string), and entropy. This function owns the shape + checksum.
    """
    if receipt_type not in HOUSE_TYPES:
        raise ValueError(f"unknown receipt_type {receipt_type!r}; one of {HOUSE_TYPES}")
    if "schema" not in payload:
        raise ValueError("payload must carry payload.schema (e.g. defendable.eval-receipt/v1)")

    envelope: dict = {
        "schema": ENVELOPE_SCHEMA,
        "receipt_id": receipt_id(seq, entropy_hex8),
        "receipt_type": receipt_type,
        "chain_id": chain_id,
        "seq": seq,
        "parent_hash": parent_hash,
        "created_at": created_at,
        "subject": subject,
        "payload": payload,
    }
    if amount_usd is not None:
        envelope["amount_usd"] = (
            f"{amount_usd:.2f}" if isinstance(amount_usd, Decimal) else str(amount_usd)
        )
    if metadata is not None:
        envelope["metadata"] = metadata

    envelope[CHECKSUM_FIELD] = receipt_sha256(envelope)
    return envelope


# --------------------------------------------------------------------------- #
# Verification (server-side and recipient-side run the SAME code)             #
# --------------------------------------------------------------------------- #

# Exact error strings — must match defendable-router core/receipts.py and
# defendable-cloud-v2 /ledger/verify so tooling can match on them.
ERR_CHECKSUM = "checksum mismatch"
ERR_PARENT = "broken parent link"


def _err_seq_gap(expected: int) -> str:
    return f"sequence gap (expected {expected})"


def verify_chain(chain_in_seq_order: Iterable[dict], *, max_errors: int = 20) -> dict:
    """Walk a single chain (one chain_id) and return {ok, receipts_checked, errors}.

    Mirrors RECEIPT-SCHEMA.md §2.1 / §5. errors capped at `max_errors`; `ok`
    reflects the whole chain regardless of the cap.
    """
    errors: list[dict] = []
    prev = ZERO_HASH
    checked = 0
    truncated = False

    for i, r in enumerate(chain_in_seq_order):
        checked += 1
        rid = r.get("receipt_id")
        seq = r.get("seq")

        if seq != i:
            _push(errors, max_errors, {"seq": seq, "receipt_id": rid, "error": _err_seq_gap(i)})

        if r.get("parent_hash") != prev:
            _push(errors, max_errors, {"seq": seq, "receipt_id": rid, "error": ERR_PARENT})

        stored = stored_checksum(r)
        recomputed = receipt_sha256(r)
        if stored != recomputed:
            _push(errors, max_errors, {"seq": seq, "receipt_id": rid, "error": ERR_CHECKSUM})

        prev = stored if stored is not None else recomputed

    # `ok` must consider errors even if we stopped appending past the cap.
    return {
        "ok": len(errors) == 0,
        "receipts_checked": checked,
        "errors": errors,
    }


def _push(errors: list, cap: int, item: dict) -> None:
    if len(errors) < cap:
        errors.append(item)


def verify_one(receipt: dict) -> bool:
    """Single-receipt content-integrity check (for /share/{token})."""
    stored = stored_checksum(receipt)
    return stored is not None and stored == receipt_sha256(receipt)


# --------------------------------------------------------------------------- #
# Migration shim — Router flat -> envelope (RECEIPT-SCHEMA.md §7)             #
# --------------------------------------------------------------------------- #

_ROUTER_TYPE_MAP = {
    "membership": "eval",
    "dataset_access": "dataset-download",
    "compute_quote": "compute",
    "compute_job": "compute",
    "fine_tune_job": "cook",
    "job_leased": "job",
    "worker_job_accepted": "job",
    "artifact_reported": "job",
    "worker_job_completed": "job",
    "worker_job_failed": "job",
    "lease_expired": "job",
    "worker_registered": "job",
}


def router_type_to_house(legacy_type: str) -> str:
    """Map a legacy Router receipt_type onto the house vocabulary (§7 Gap 2)."""
    try:
        return _ROUTER_TYPE_MAP[legacy_type]
    except KeyError:
        raise ValueError(f"no house mapping for legacy router type {legacy_type!r}")


if __name__ == "__main__":
    # Self-test: mint a 3-receipt chain, verify, then tamper and confirm it breaks
    # at the exact seq. `1 + 1 = 2` — check it yourself.
    chain: list[dict] = []
    parent = ZERO_HASH
    for i in range(3):
        r = mint(
            receipt_type="compute",
            chain_id="house",
            seq=i,
            parent_hash=parent,
            created_at=f"2026-05-31T16:0{i}:00Z",
            subject={"member_id": "mem_test", "job_id": f"job_{i}"},
            payload={"schema": "defendable.compute-receipt/v1", "phase": "complete",
                     "gpu": "RTX 5090", "seconds": 3600},
            amount_usd=Decimal("6.00"),
            entropy_hex8=f"{i:08x}",
        )
        chain.append(r)
        parent = r[CHECKSUM_FIELD]

    assert verify_chain(chain)["ok"] is True, "clean chain must verify"
    chain[1]["payload"]["seconds"] = 7200  # tamper
    result = verify_chain(chain)
    assert result["ok"] is False, "tampered chain must fail"
    seqs = {e["seq"] for e in result["errors"]}
    assert 1 in seqs, "must flag the tampered receipt at seq 1"
    print("defendable_receipt self-test PASS:", result)
