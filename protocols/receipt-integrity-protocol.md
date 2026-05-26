# Receipt Integrity Protocol

Purpose: define what receipt hashes prove.

Inputs:
- canonical JSON payload
- SHA-256 hash

Outputs:
- content-integrity linkage

Pass/fail rules:
- published hash must recompute from the documented canonical artifact
- public wording must not overstate the hash claim

Status label:
- `VERIFIED_AS_DOCUMENTED_WITH_LIMITATIONS`

Limitations:
- hashes do not prove authorship
- hashes do not prove owner approval
- hashes do not prove certification, insurance, anchoring, or production clearance

Related:
- Tribunal audit repo
