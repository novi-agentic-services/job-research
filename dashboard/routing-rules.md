# Routing Rules (Operational)

## Task ID format
`TASK-YYYYMMDD-HHMM-###`

## Rule Set

1. **Always plan first**
   - Route to `planner` when scope is not trivial.

2. **Architecture gate**
   - Route to `architect` before coding if task spans multiple services/components.

3. **Language-aware review**
   - Route to language reviewer based on dominant language:
     - TS → `typescript-reviewer`
     - Python → `python-reviewer`
     - Go → `go-reviewer`
     - Java → `java-reviewer`
     - Kotlin → `kotlin-reviewer`
     - Rust → `rust-reviewer`
     - C++ → `cpp-reviewer`

4. **Build failure specialization**
   - Prefer specialized build resolver first; fallback to `build-error-resolver`.

5. **Security is mandatory**
   - `security-reviewer` must sign off for production-impacting changes.

6. **E2E evidence mandatory for UI changes**
   - Route to `e2e-runner` and require screenshots/videos/traces.

7. **Docs update mandatory**
   - `doc-updater` required if behavior/contracts/config changed.

8. **Refactor tasks**
   - Route to `refactor-cleaner` and re-run language reviewer + security.

9. **Performance tasks**
   - Route to `performance-optimizer`; require before/after metrics.

10. **Recurring workflows**
   - Route periodic checks to `loop-operator`.

## Completion Gates

Task can move to COMPLETED only if:
- build/test pass
- review passed
- security gate passed
- docs updated where needed
- no remaining work for this task
