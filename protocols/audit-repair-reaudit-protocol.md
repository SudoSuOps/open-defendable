# Audit / Repair / Re-audit Protocol

Purpose: separate builder work from referee verification and owner promotion.

Inputs:
- builder release
- safety gate result
- Codex audit tape
- accepted findings

Outputs:
- verdict
- repair scope
- re-audit result

Pass/fail rules:
- builders do not self-clear their own release
- accepted findings define the repair scope
- repaired public commits must be independently re-audited

Status label:
- `READY_WITH_LIMITATIONS`

Limitations:
- owner promotion remains a separate control

Related:
- Tribunal audit repo
