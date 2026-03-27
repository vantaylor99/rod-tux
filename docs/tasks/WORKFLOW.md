# Workflow

## Required flow
1. Open `docs/tasks/QUEUE.md`.
2. Confirm no task is currently marked `IN PROGRESS`.
3. Claim the next task in queue order by updating the queue and the task file status.
4. Read the full task document before touching code.
5. Work only in the files listed under scope/likely files unless you first update the task doc with a justified scope change.
6. Record what changed, what was tested, and any remaining risks in the task file.
7. Mark the task `DONE` only when acceptance criteria and QA checklist are satisfied.
8. Move the completed task file to `docs/tasks/archive/` only after the task is complete and the queue is updated.

## Guardrails
- Do not duplicate work: if a problem overlaps an existing task, continue in that task instead of creating a parallel fix path.
- Do not expand scope without updating the task doc first.
- Do not start a second task while one is `IN PROGRESS`.
- Do not make unrelated cleanup changes while implementing a scoped task.
- Do not edit Shopify-generated JSON files unless the task explicitly requires it.

## Status definitions
- `TODO`: Ready to be picked up.
- `IN PROGRESS`: Currently claimed by one agent.
- `BLOCKED`: Cannot proceed until a listed dependency or decision is resolved.
- `DONE`: Acceptance criteria met and QA recorded.

