# Defendable Receipt — Reference Implementation

The one module every minter and reader in the house imports, so the
canonicalization + checksum + chain math is **byte-identical everywhere**.

- **Spec:** [`../RECEIPT-SCHEMA.md`](../RECEIPT-SCHEMA.md) — `defendable.receipt/v1`
- **JSON Schema:** [`../public/specs/defendable-receipt-v1.json`](../public/specs/defendable-receipt-v1.json)
- **Code:** [`defendable_receipt.py`](./defendable_receipt.py) — pure stdlib, zero deps

## Why this exists

Before this, the house had three field names for the same hash
(`receipt_sha256` / `checksum_sha256` / `receipt_hash`) and ad-hoc receipt
shapes per repo. That undermines the "one verifiable system of record" promise
and risks breaking live readers (Dash reads the Router chain) on any rename.

This module is the cutover: minters (`defendable-cloud-v2`, `defendable-router`)
and readers (`defendable-dash`, `defendable-graph`, `defendable-ledger`) all
call the same `mint()` / `verify_chain()` / `verify_one()`. Readers also accept
the legacy `checksum_sha256` field during the Router migration (RECEIPT-SCHEMA
§7) so nothing breaks at cutover.

## Use

```python
from decimal import Decimal
import defendable_receipt as dr

r = dr.mint(
    receipt_type="compute", chain_id="house", seq=last_seq + 1,
    parent_hash=prior.receipt_sha256, created_at=now_iso,
    subject={"member_id": mem, "job_id": job},
    payload={"schema": "defendable.compute-receipt/v1", "phase": "complete", "gpu": "RTX 5090"},
    amount_usd=Decimal("6.00"), entropy_hex8=rand_hex8,
)
# verify a whole chain (server-side or recipient-side — same code)
dr.verify_chain(chain_in_seq_order)   # {ok, receipts_checked, errors}
dr.verify_one(r)                       # single-receipt content-integrity
```

## Self-test

```
python3 defendable_receipt.py
# defendable_receipt self-test PASS: mints a 3-receipt chain, verifies it,
# tampers seq 1, confirms it breaks at the exact seq with "checksum mismatch".
```

Math and code. No judge. No blackbox.
