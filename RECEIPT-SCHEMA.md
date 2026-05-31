# RECEIPT-SCHEMA.md — The Defendable Receipt Standard

**Status:** canonical · `defendable.receipt/v1`
**Owner:** OpenDefendable (public standards layer)
**Supersedes:** `defendable-receipt-v0.1` (checksummed-only draft), per-repo ad-hoc receipt shapes
**Adopted by:** defendable-cloud-v2 · defendable-router · defendable-ledger · defendable-graph · defendable-dash · defendable-datasets · defendable-dos-cli · Defendable-Gold-Cooks

---

## 0. Doctrine

> We don't judge. We are math and code. The referee applies a declared rulebook and throws flags — never a judge model, never opinion, never a quality grade.

Every Defendable receipt obeys four laws:

1. **Hash-chained.** Each receipt references the prior receipt's hash (`parent_hash`). The chain is append-only. Mutating any receipt breaks every link after it.
2. **Checksummed.** Each receipt carries a SHA-256 (`receipt_sha256`) over its canonical body. Recompute it and it must match.
3. **Recipient-verifiable.** Verification is pure math the recipient runs themselves — canonical JSON → SHA-256 → compare. No server trust, no judge model, no blackbox. `1 + 1 = 2`, check it yourself.
4. **Referee, not judge.** A receipt records the **outcome of applying a declared rulebook** (a Flight Sheet). It carries flags, not opinions. Severity is flag-driven (`propolis` / `jelly` / `honey`), never a model's vibe.

A receipt is **not** a signature, an attestation, a certification, insurance, blockchain anchoring, or production clearance. SHA-256 establishes **content-integrity and chain-order** only. Anything beyond that (owner approval, ENS signature, deed reconciliation) is a separate, explicitly-labeled layer.

---

## 1. The Common Envelope

Every receipt — regardless of type — is a JSON object with this envelope. Type-specific data lives under `payload`. The envelope fields are the load-bearing, chain-and-integrity contract; the payload is the body.

| Field | Type | Required | Description |
|---|---|---|---|
| `schema` | string | yes | Schema id + version. Envelope is always `defendable.receipt/v1`. The `payload.schema` carries the type schema (e.g. `defendable.eval-receipt/v1`). |
| `receipt_id` | string | yes | Stable human-readable id. Format `DCR-{seq:06d}-{hex8}` (see §1.1). |
| `receipt_type` | string | yes | One of the house types (§3). |
| `chain_id` | string | yes | Which chain this receipt belongs to. `org:{org_id}` for per-org chains (Cloud), `house` for the single-tenant spine chain (Router). |
| `seq` | int | yes | Monotonic sequence within `chain_id`. Genesis is `0`. No gaps. |
| `parent_hash` | string (64 hex) | yes | The `receipt_sha256` of the prior receipt in this chain. Genesis parent is `ZERO_HASH` = 64 zeros. |
| `created_at` | string (ISO-8601 UTC) | yes | Mint time. |
| `subject` | object | yes | What this receipt is about: `{member_id, org_id, run_id?, job_id?, dataset_ids?}`. Nulls allowed for fields that don't apply. |
| `amount_usd` | string (decimal, 2dp) | no | Money moved/metered, as a 2-decimal string (`"6.00"`), never a float. Omit/`null` if none. |
| `payload` | object | yes | Type-specific body (§3). Must itself carry `payload.schema`. |
| `metadata` | object | no | Free-form, non-load-bearing context. Never hashed-sensitive secrets. |
| `receipt_sha256` | string (64 hex) | yes | SHA-256 over the canonical body (everything **except** `receipt_sha256` itself). Appended **after** hashing. See §2. |

### 1.1 `receipt_id` format

`DCR-{seq:06d}-{hex8}` — e.g. `DCR-000042-9f2c1ab3`. `DCR` = Defendable Receipt. `seq` is the chain sequence zero-padded to 6. `hex8` is 8 hex chars of entropy to keep ids opaque/unique even at the same seq across re-mints. The Router's legacy `rcpt_{uuid}` ids are accepted in-chain during migration (§7) but new mints use `DCR-…`.

---

## 2. Canonicalization & Checksum (the math the recipient runs)

The checksum is **SHA-256 of the canonical JSON of the body**, where *body* = the full receipt object with the `receipt_sha256` key removed.

**Canonical JSON rules (identical across the house):**

- Keys sorted lexicographically (`sort_keys`).
- No insignificant whitespace — separators `(",", ":")`.
- UTF-8 bytes.
- `Decimal` / money → fixed 2-decimal **string** (`"6.00"`), never a float.
- Datetimes → ISO-8601 string.
- Then `sha256_hex(canonical_bytes)`.

```python
# Reference (matches defendable-cloud-v2 app/hashing.py and
# defendable-router core/receipts.py canonical_json):
def canonical(body: dict) -> bytes:
    # orjson.OPT_SORT_KEYS (Cloud) or json.dumps(sort_keys=True,
    # separators=(",",":"), ensure_ascii=True) (Router) — same bytes.
    ...

def receipt_sha256(receipt: dict) -> str:
    body = {k: v for k, v in receipt.items() if k != "receipt_sha256"}
    return hashlib.sha256(canonical(body)).hexdigest()
```

> Note: `parent_hash` and `seq` are **inside** the hashed body. That is what makes the link tamper-evident — you cannot re-order or re-parent a receipt without changing its `receipt_sha256`, which orphans every child.

### 2.1 Chain verification algorithm

Anyone with the chain can verify it with no server:

```
prev = ZERO_HASH                       # 64 zeros
for i, r in enumerate(chain_in_seq_order):
    assert r.seq == i                  # no gaps, starts at 0
    assert r.parent_hash == prev       # links to prior receipt's hash
    body = {k:v for k,v in r.items() if k != "receipt_sha256"}
    assert sha256(canonical(body)) == r.receipt_sha256   # checksum holds
    prev = r.receipt_sha256
ok = (no assertion failed)
```

Mutate any payload byte → its `receipt_sha256` changes → the next receipt's `parent_hash` no longer matches → verification fails **at the exact seq of tampering**. This is the kill-shot tamper test (proven live on cloud-v2: mutate receipt in PG → `/ledger/verify` returns `ok:false`).

---

## 3. Receipt Types (the house vocabulary)

Each type is a `payload.schema`. The envelope `receipt_type` is the short tag. All types ride the **same** envelope (§1) and the **same** chain math (§2).

| `receipt_type` | `payload.schema` | Minted by | Records |
|---|---|---|---|
| `eval` | `defendable.eval-receipt/v1` | Cloud, Dash | A Defendable Run: inputs → evidence → checks → verdict → approval. The referee's flags. |
| `cook` | `defendable.cook-receipt/v1` | Cloud, Gold-Cooks | A fine-tune cook: recipe, corpus hashes, canary, before→after lift, beat-base A/B, merge status. |
| `dataset-download` | `defendable.dataset-download-receipt/v1` | Cloud, Router, Datasets | A member pulling a dataset: dataset_ids, bytes, quota, file hashes. |
| `dataset-promotion` | `defendable.dataset-promotion-receipt/v1` | Cloud, Datasets | Eval → dataset promotion (the flywheel): card, manifest, samples, splits, source receipts. |
| `model-pin` | `defendable.model-pin-receipt/v1` | Cloud | A member declaring *which model* a run used: slug, weights sha256, base, provenance. |
| `incident` | `defendable.incident-receipt/v1` | Cloud, Dash | A failure/anomaly: severity, what broke, blast radius, remediation. |
| `compute` | `defendable.compute-receipt/v1` | Router | Compute metered/quoted/job: quote, lease, run, cost, worker contract events. |
| `job` | `defendable.job-receipt/v1` | Router | Job lifecycle: leased → accepted → status/log/artifact → completed/failed. |
| `retrieval` | `defendable.retrieval-receipt/v1` | SwarmRetrieve | A defendable retrieval: query, sources, Tribunal grade, extracted-fact hashes. |
| `deed` | `defendable.deed-receipt/v1` | Ledger | A titled deed: the sealed, recorded reconciliation of a verified asset/pair. **Roadmap-labeled** until DDEED stubs graduate (see §6). |

### 3.1 Type payload contracts (load-bearing fields)

These are the fields each `payload` MUST carry. Additional fields are allowed (`extra: allow`). All hashes are SHA-256 hex.

- **eval** — `run{id,lane,title,inputs}`, `evidence[]{kind,label,sha256,content_type,byte_size}`, `checks[]{check_key,label,category,status,detail,score}`, `verdict{outcome,summary,score,checks_passed,checks_failed}`, `approval{decision,approver,note,approved_at}`. `status` ∈ `pass|flag|open|skip`. `verdict.outcome` ∈ `honey|jelly|propolis` (§4).
- **cook** — `recipe{name,base_model,target_modules,rank,alpha,epochs}`, `corpus{train_sha256,eval_sha256,record_count}`, `canary{mode,loss,oom,merge,verdict}`, `result{train_loss,eval_loss,merge_status}`, `beat_base{gates[],tuned_pass,base_pass,delta,verdict}`.
- **dataset-download** — `dataset_ids[]`, `byte_size`, `file_count`, `files[]{path,sha256,byte_size}`, `quota{used,limit,window_days}`.
- **dataset-promotion** — `source_run_id`, `dataset_slug`, `version`, `card_sha256`, `manifest_sha256`, `splits{train,eval,test}`, `source_receipt_ids[]`, `tier`.
- **model-pin** — `model_slug`, `weights_sha256`, `base_model`, `provenance`, `quantization`.
- **incident** — `severity` (§4), `title`, `what_broke`, `blast_radius`, `detected_at`, `remediation`, `status`.
- **compute** — `phase` ∈ `quote|lease|meter|complete`, `gpu`, `rate_usd_per_hr`, `seconds`, `worker_id`, `node`.
- **job** — `phase` ∈ `leased|accepted|status|log|artifact|completed|failed`, `worker_id`, `artifact{kind,sha256,byte_size}?`, `failure_reason?`.
- **retrieval** — `query`, `sources[]{url,extracted_sha256,tribunal_grade}`, `bundle_sha256`.
- **deed** — `deed_status` ∈ `STUB_CREATED|SEALED`, `asset_manifest_sha256`, `provenance_trail[]`, `source_receipt_ids[]`, `merkle_root?`.

---

## 4. Severity Model (referee flags, not grades)

Severity is **flag-driven**, set by the rulebook (Flight Sheet), never by a model.

| Tier | Meaning | Trigger |
|---|---|---|
| **propolis** | Critical. Verdict fails. | One or more **critical** flags raised (a critical rule not satisfied). |
| **jelly** | Non-critical flags present. | Only non-critical flags raised. Work proceeds with noted concerns. |
| **honey** | Clean. | **No flags** raised **and** owner-approved. |

Rules: `score` = % of rules satisfied (not a quality grade). A rule is binary: `satisfied | raise flag`. The verdict tier is computed from flags, deterministically, in code.

> Naming collision resolved: `honey/jelly/propolis` are **verdict tiers** on a receipt. The dataset **quality tiers** (`royal_jelly/honey/jelly/pollen/propolis` from the Royal Jelly rubric) are a *separate* scale that lives in `dataset-promotion` payloads under `payload.tier`. Never conflate the two — verdict severity ≠ corpus quality tier. Incident severity also maps `critical→propolis`, `minor→honey` for printed risk tiers.

---

## 5. Verify Endpoint Contract

Every minting surface MUST expose chain verification. Two endpoints, identical semantics.

### `GET /ledger/verify` (per-org chains — Cloud) · `GET /receipts/verify` (house chain — Router)

Walks the chain server-side using the **same math the recipient would run** (§2.1) and returns:

```json
{
  "ok": true,
  "receipts_checked": 82,
  "errors": []
}
```

On tamper:

```json
{
  "ok": false,
  "receipts_checked": 82,
  "errors": [
    { "seq": 41, "receipt_id": "DCR-000041-7b0e9c2d", "error": "checksum mismatch" },
    { "seq": 42, "receipt_id": "DCR-000042-9f2c1ab3", "error": "broken parent link" }
  ]
}
```

**Error kinds (exact strings):** `"checksum mismatch"`, `"sequence gap (expected N)"`, `"broken parent link"`. `errors` is capped (first 20) so the response stays bounded; `ok` reflects the whole chain.

### `GET /share/{token}` (public, no auth) — single-receipt proof

Returns the receipt plus a server-computed `verified` boolean (SHA-256 of canonical payload vs stored `receipt_sha256`) so a recipient can confirm and then independently recompute:

```json
{
  "receipt_id": "DCR-000042-9f2c1ab3",
  "seq": 42,
  "parent_hash": "…",
  "receipt_sha256": "…",
  "verified": true,
  "created_at": "2026-05-31T12:00:00Z",
  "payload": { "...": "..." }
}
```

### `GET /receipts` / `GET /receipts/recent` — chain coordinates

Returns coordinates only (`receipt_id, seq, receipt_type, parent_hash, receipt_sha256, created_at, share_url`) for ledger views (Dash, Graph). Full payload only via `/share/{token}`.

**CLI parity:** `defendable-router verify-ledger` (Router) and the Cloud admin tool recompute the same chain offline.

---

## 6. Layers Above Integrity (explicitly NOT the receipt)

These ride **on top of** a verified receipt and must be separately labeled. A receipt is never silently upgraded into one of these:

- **Owner approval** — a human decision. `payload.approval.decision`. Simulated/`SIMULATED-OWNER` approvals must be marked as such (per dos-cli discipline).
- **Deed / DDEED** — Ledger seals a `deed-receipt` referencing source receipt ids. `deed_status: STUB_CREATED` until graduated. **Roadmap** where not live.
- **ENS-signed receipts / reconciliation deeds** — design-intent. Mark roadmap until shipped.
- **Merkle anchoring** — the `swarmchain` Merkle-root-over-50-blocks → Hedera HCS path is a *third-party-ledger anchor*, orthogonal to the per-chain integrity here. Per **kill-hedera doctrine**, the in-house hash chain (this spec) is the spine; HCS anchoring is optional audit-trail, not required for a valid receipt.

---

## 7. Migration Note — defendable-router → unified chain

**Current state (verified in code):** `defendable_router/core/receipts.py` **already hash-chains.** It is no longer checksummed-only. Every receipt carries `seq + parent_hash` hashed into `checksum_sha256`, `_chain_head()` walks the chain, and `verify_ledger()` recomputes checksums + validates seq/parent links — mirroring Cloud's `/ledger/verify`. The "checksummed-only" label in older docs/profiles is **stale**; the code matches Cloud's chain math today. Two gaps remain to reach full envelope parity with cloud-v2:

**Gap 1 — field-name alignment.** Router uses `checksum_sha256`; Cloud uses `receipt_sha256`. Same semantic, different name (this exact drift is flagged in defendable-dash types and defendable-docs).
**Migration:** rename Router's `checksum_sha256` → `receipt_sha256` on write; **dual-read both** on verify during transition so existing JSONL files still validate. Add an envelope `chain_id: "house"` (Router runs ONE house-wide chain, single-tenant spine; Cloud runs `org:{org_id}` chains). Adopt the `DCR-{seq:06d}-{hex8}` `receipt_id` format for new mints; keep accepting legacy `rcpt_{uuid}` ids already in-chain.

**Gap 2 — envelope shape.** Router's flat fields (`member_id`, `job_id`, `dataset_ids`, `amount_usd`, `metadata`) predate the §1 envelope.
**Migration:** wrap them — `member_id/org_id/job_id/dataset_ids` move under `subject`; type-specific data moves under `payload` with a `payload.schema`. `amount_usd` stays top-level (already a 2dp string via the `Decimal(...).quantize` path — good). Map Router's five legacy types onto §3: `membership`→ `subject`-only `eval`/admin receipt; `dataset_access`→`dataset-download`; `compute_quote`/`compute_job`→`compute`; `fine_tune_job`→`cook`; worker-contract events (`job_leased`, `worker_job_accepted`, `artifact_reported`, `worker_job_completed/failed`, `lease_expired`)→`job` with `payload.phase`.

**Migration procedure (no chain break):**
1. Freeze writes. Snapshot `data/receipts/*.receipts.jsonl`.
2. Run a one-shot rewriter that, **in seq order**, reshapes each receipt into the §1 envelope, recomputes `receipt_sha256` over the new canonical body, and re-links `parent_hash` to the prior **new** hash. This produces a fresh, internally-consistent chain (the old hashes do not carry over — the rewrite IS the new genesis-forward chain; record the cutover in an `incident`/`audit` receipt for provenance).
3. Verify the rewritten chain with the §2.1 algorithm before unfreezing.
4. Switch the live writer to mint §1 envelopes; switch `/receipts/verify` to the dual-read (then single-read after backfill).
5. Move SQLite→Postgres on the documented Fly path; the chain math is storage-agnostic (JSONL or PG rows both just need seq + parent_hash + body).

> The rewrite is honest precisely because it is *recorded*: a cutover receipt names the old head hash and the new genesis, so the discontinuity is itself a verifiable ledger entry — not a silent re-history.

---

## 8. Envelope JSON Example

A `compute` receipt minted by the Router on the house chain (seq 42, child of seq 41):

```json
{
  "schema": "defendable.receipt/v1",
  "receipt_id": "DCR-000042-9f2c1ab3",
  "receipt_type": "compute",
  "chain_id": "house",
  "seq": 42,
  "parent_hash": "8d3f2e1a7c9b4d6e5f0a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60",
  "created_at": "2026-05-31T16:04:11Z",
  "subject": {
    "member_id": "mem_7Qk2",
    "org_id": "swarmandbee-ai-f2ae07",
    "run_id": null,
    "job_id": "job_5090_0001",
    "dataset_ids": []
  },
  "amount_usd": "6.00",
  "payload": {
    "schema": "defendable.compute-receipt/v1",
    "phase": "complete",
    "gpu": "RTX 5090",
    "node": "whale@192.168.0.99",
    "rate_usd_per_hr": "6.00",
    "seconds": 3600,
    "worker_id": "wrk_5090_a1",
    "verdict": {
      "outcome": "honey",
      "summary": "Job completed; all rules satisfied; no flags.",
      "score": 100,
      "checks_passed": 6,
      "checks_failed": 0
    }
  },
  "metadata": {
    "lease_id": "lease_0c44",
    "cook_id": "cs-edge-4b"
  },
  "receipt_sha256": "f1e2d3c4b5a6978869504132231405f6e7d8c9ba0b1c2d3e4f5061728394a5b6"
}
```

To verify: strip `receipt_sha256`, canonicalize the rest (sorted keys, `(",",":")`, money as 2dp strings), SHA-256 it, compare to `receipt_sha256`. Then confirm `parent_hash` equals seq-41's `receipt_sha256`. Math and code. No judge. No blackbox.

---

*OpenDefendable · the open standards layer. Inspect it, implement it, improve it in public.*
