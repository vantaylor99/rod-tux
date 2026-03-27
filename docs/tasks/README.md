# Task System

This repo uses a serialized task queue for storefront implementation work.

Rules:
- Only one task may be `IN PROGRESS` at a time.
- Future agents must check `docs/tasks/QUEUE.md` first.
- Future agents must claim the next eligible task in queue order.
- If any task is already `IN PROGRESS`, do not start another one.
- Work only inside the files listed in the claimed task unless the task document is explicitly updated first.
- Completed task files should be moved into `docs/tasks/archive/` only after acceptance criteria and QA notes are finished.

Use these files together:
- `docs/tasks/QUEUE.md`
- `docs/tasks/WORKFLOW.md`
- `docs/tasks/TASK-###-*.md`

