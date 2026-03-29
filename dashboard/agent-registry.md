# Agent Registry (Everything Claude Code)

Purpose: operational mapping so all available agents are employed via explicit ownership and triggers.

## Global Orchestration Agents

| Agent | Primary Role | Trigger |
|---|---|---|
| chief-of-staff | portfolio coordination, sequencing | multi-task initiatives, cross-team sync |
| planner | implementation planning and risk breakdown | new feature / unclear scope |
| architect | architecture decisions and boundaries | cross-service design, major refactor |
| loop-operator | recurring loops and heartbeat tasks | periodic checks, monitoring loops |
| harness-optimizer | improve agent harness performance | workflow inefficiency, slow cycles |

## Build & Reliability Agents

| Agent | Primary Role | Trigger |
|---|---|---|
| build-error-resolver | generic build break triage | unknown build failure |
| go-build-resolver | Go build/test failures | Go compile/test errors |
| java-build-resolver | Java build failures | Maven/Gradle Java failures |
| kotlin-build-resolver | Kotlin build failures | Kotlin/Android/KMP failures |
| rust-build-resolver | Rust build failures | cargo / borrow checker failures |
| cpp-build-resolver | C++ build/link failures | CMake / linker/compiler failures |
| pytorch-build-resolver | PyTorch runtime/build issues | DL training/runtime issues |

## Code Quality Review Agents

| Agent | Primary Role | Trigger |
|---|---|---|
| code-reviewer | universal code review | all PR-level changes |
| typescript-reviewer | TS/JS standards review | TypeScript-heavy changes |
| python-reviewer | Python standards review | Python-heavy changes |
| go-reviewer | Go idiomatic review | Go-heavy changes |
| java-reviewer | Java review | Java-heavy changes |
| kotlin-reviewer | Kotlin review | Kotlin-heavy changes |
| rust-reviewer | Rust review | Rust-heavy changes |
| cpp-reviewer | C++ review | C++ heavy changes |
| flutter-reviewer | Flutter/mobile review | Flutter app changes |
| database-reviewer | schema/query/index review | DB migrations/query tuning |
| healthcare-reviewer | compliance-sensitive review | healthcare/regulated domain |
| security-reviewer | security review and hardening | pre-merge security gate |

## Testing, Docs, Refactoring, Optimization

| Agent | Primary Role | Trigger |
|---|---|---|
| tdd-guide | test-driven implementation support | new code requiring TDD |
| e2e-runner | E2E execution and evidence capture | frontend/integration release gate |
| docs-lookup | API/docs reference retrieval | uncertainty around APIs |
| doc-updater | update documentation artifacts | behavior/contract changes |
| refactor-cleaner | cleanup and simplification | tech debt/refactor stories |
| performance-optimizer | profiling and perf tuning | latency/throughput regressions |

## Default Execution Order

1. chief-of-staff / planner
2. architect (if needed)
3. implementation lane
4. build resolver (if broken)
5. language reviewer + code-reviewer
6. security-reviewer
7. e2e-runner / tdd-guide outputs validated
8. doc-updater

---

## Assignment Rule

Every task must include:
- unique Task ID
- brief description
- owner agent
- backup agent
- completion evidence
