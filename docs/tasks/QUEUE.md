# Queue

Only one task may be `IN PROGRESS` at a time.

| Task ID | Title | Priority | Status | Owner | Dependencies | Primary Files |
| --- | --- | --- | --- | --- | --- | --- |
| TASK-001 | Mobile header drawer layering and menu clipping | P1 | DONE | Codex | None | `sections/header.liquid`, `snippets/header-drawer.liquid`, `assets/header-drawer.js`, `assets/header.js`, `assets/base.css` |
| TASK-002 | Mobile hero media fit and first-screen legibility | P1 | DONE | Codex | TASK-001 recommended first | `sections/hero.liquid`, `templates/index.json`, `assets/base.css` |
| TASK-003 | Desktop header transparency and hero top-edge alignment | P1 | DONE | Codex | TASK-001, TASK-002 recommended before final QA | `sections/header-group.json`, `sections/header.liquid`, `sections/hero.liquid`, `assets/base.css`, `assets/desktop-optimizations.css` |
| TASK-004 | Homepage section spacing and content clipping cleanup | P2 | DONE | Codex | TASK-002 | `templates/index.json`, `assets/base.css`, `sections/section.liquid`, `sections/featured-product.liquid` |
| TASK-005 | Responsive consistency and homepage polish regression pass | P2 | DONE | Codex | TASK-001, TASK-002, TASK-003, TASK-004 | `assets/base.css`, `assets/desktop-optimizations.css`, homepage sections touched by prior tasks |
| TASK-006 | Desktop header and homepage visual cleanup | P1 | DONE | Codex | TASK-001, TASK-003, TASK-004, TASK-005 | `assets/base.css`, `assets/desktop-optimizations.css`, `sections/header.liquid`, `sections/hero.liquid`, `sections/featured-product.liquid` |
