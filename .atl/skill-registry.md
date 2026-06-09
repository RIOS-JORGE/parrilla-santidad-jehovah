# Skill Registry

Generated: 2026-06-09
Project: la-brutal-hamburgueseria

## Project Skills

No project-level skills detected.

## User Skills (`~/.config/opencode/skills/`)

| Name | Trigger | Path | Compact Rules |
|------|---------|------|---------------|
| branch-pr | Creating, opening, or preparing PRs for review | `~/.config/opencode/skills/branch-pr/SKILL.md` | Every PR MUST link an approved issue with `status:approved`; exactly one `type:*` label; branch format `type/description` (lowercase, `a-z0-9._-`); use PR template with Linked Issue, PR Type, Summary, Changes; automated checks must pass before merge; blank PRs blocked by CI. |
| chained-pr | PRs over 400 lines, stacked PRs, review slices | `~/.config/opencode/skills/chained-pr/SKILL.md` | Split PRs >400 lines unless `size:exception` accepted; keep each PR ≤60 min review; state start/end/deps/follow-up/out-of-scope in every chained PR; child PRs include a dependency diagram marking current PR with `📍`; Feature Branch Chain uses a draft tracker PR; no mixing chain strategies after user chooses. |
| cognitive-doc-design | Writing guides, READMEs, RFCs, onboarding, architecture, or review-facing docs | `~/.config/opencode/skills/cognitive-doc-design/SKILL.md` | Lead with the answer/outcome first; progressive disclosure (happy path → details → edge cases); chunking/signposting via headings and callouts; recognition over recall (tables, checklists, templates); review empathy — state what to review first, what's out of scope; use the Outcome → Quick path → Details → Checklist → Next step structure. |
| comment-writer | PR feedback, issue replies, reviews, Slack messages, or GitHub comments | `~/.config/opencode/skills/comment-writer/SKILL.md` | Start with the actionable point, don't recap the whole PR; warm and direct (thoughtful teammate, not corporate bot); keep to 1-3 short paragraphs or tight bullet list; explain WHY when asking for a change; avoid pile-ons — comment on highest-value issue only; match thread language (Rioplatense voseo in Spanish: `podés`, `tenés`); no em dashes. |
| go-testing | Go tests, go test coverage, Bubbletea teatest, golden files | `~/.config/opencode/skills/go-testing/SKILL.md` | Prefer table-driven tests with `t.Run(tt.name, ...)`; test behavior/state transitions, not implementation trivia; use `t.TempDir()` for filesystem tests; integration tests skippable with `testing.Short()`; Bubbletea: `Model.Update()` for state, `teatest` only for interactive flows; golden files deterministic, update only through repo `-update` path. |
| issue-creation | Creating GitHub issues, bug reports, or feature requests | `~/.config/opencode/skills/issue-creation/SKILL.md` | MUST use template (bug report or feature request) — blank issues disabled; every issue gets `status:needs-review` on creation; maintainer MUST add `status:approved` before any PR; questions go to Discussions, not issues; search existing issues for duplicates first; bug report requires pre-flight checks, description, steps, expected/actual behavior, OS, agent, shell. |
| judgment-day | Judgment day, dual review, adversarial review, juzgar | `~/.config/opencode/skills/judgment-day/SKILL.md` | Resolve project skills before launching; launch two blind judges in parallel with identical target and criteria; wait for both before synthesis; classify warnings as `WARNING (real)` only if normal intended use triggers them, else downgrade to INFO; ask before fixing Round 1 confirmed issues; re-judge after fixes; terminal states: `APPROVED` or `ESCALATED`; after 2 fix iterations with remaining issues, ask user. |
| skill-creator | New skills, agent instructions, documenting AI usage patterns | `~/.config/opencode/skills/skill-creator/SKILL.md` | Skill = LLM runtime instruction contract, not human docs; frontmatter must include `name`, `description` (one line, ≤250 chars, trigger-first), `license`, `metadata.author`, `metadata.version`; target 180-450 tokens body, hard max 1000; sections order: Activation Contract → Hard Rules → Decision Gates → Execution Steps → Output Contract → References; references must be local files; put code examples in `assets/`, not body. |
| work-unit-commits | Implementation, commit splitting, chained PRs | `~/.config/opencode/skills/work-unit-commits/SKILL.md` | Commit by work unit (deliverable behavior/fix/docs), not by file type; keep tests with code they verify; keep docs with user-visible change they explain; tell a story — reviewer should understand why each commit exists; each commit should be a candidate chained PR when change grows; follow SDD workload forecast: low risk = single PR, medium = monitor, high = follow `delivery_strategy`. |

## SDD Skills (built-in)

| Name | Description |
|------|-------------|
| sdd-init | Initialize SDD context, testing capabilities, registry, and persistence |
| sdd-explore | Explore SDD ideas before committing to a change |
| sdd-propose | Create an SDD change proposal with intent, scope, and approach |
| sdd-spec | Write SDD delta specs with requirements and scenarios |
| sdd-design | Create the SDD technical design and architecture approach |
| sdd-tasks | Break an SDD change into implementation tasks |
| sdd-apply | Implement SDD tasks from specs and design |
| sdd-verify | Execute tests and prove implementation matches specs |
| sdd-archive | Archive a completed SDD change by syncing delta specs |
| sdd-onboard | Walk users through the SDD workflow on the real codebase |

## Convention Files

No project-level convention files detected. Project-level conventions are defined in the system prompt persona (`~/.config/opencode/AGENTS.md`).

## Registered Skills (deduplicated)

- branch-pr
- chained-pr
- cognitive-doc-design
- comment-writer
- go-testing
- issue-creation
- judgment-day
- skill-creator
- work-unit-commits
- sdd-init
- sdd-explore
- sdd-propose
- sdd-spec
- sdd-design
- sdd-tasks
- sdd-apply
- sdd-verify
- sdd-archive
- sdd-onboard
