# Public Field Release Protocol

Purpose: define what must be true before a public field surface is promoted.

Inputs:
- source commit
- build result
- public safety gate
- public HTTP verification
- accepted audit tape

Outputs:
- release package
- public status label
- hold or promotion decision

Pass/fail rules:
- public surface must be reachable
- claims must match accepted audit state
- critical failures keep promotion on hold

Status label:
- `READY_WITH_LIMITATIONS`

Limitations:
- does not clear production by itself

Related:
- DefendableCloud field release
- DefendableDocs field release
