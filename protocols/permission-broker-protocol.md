# Permission Broker Protocol

Purpose: classify actions as allow, deny, or queue while keeping claims honest.

Inputs:
- policy snapshot
- action request
- local broker state

Outputs:
- allow and execute local mock
- deny
- queue for human approval

Pass/fail rules:
- forbidden action must remain blocked
- queued human review must not create sensitive side effects
- external SaaS enforcement must not be claimed without proof

Status label:
- `VERIFIED_AS_REPAIRED_WITH_LIMITATIONS`

Limitations:
- CLI/local proof is stronger than external platform proof

Related:
- `permission-broker`
- Tribunal audit repo
