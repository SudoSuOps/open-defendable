# Agent Roster Protocol

Purpose: keep recommendation, owner approval, continuity assignment, and enforcement state separate.

Inputs:
- runtime health or status evidence
- owner decision
- continuity policy

Outputs:
- starter / backup / coverage state
- owner-approved roster status
- exportable snapshot

Pass/fail rules:
- recommendation alone must not change owner-approved state
- backup role must remain distinct from starter role
- coverage state must remain explicit

Status label:
- `VERIFIED_AS_REPAIRED_WITH_LIMITATIONS`

Limitations:
- not production-cleared

Related:
- `owner-roster-registry`
- Tribunal audit repo
