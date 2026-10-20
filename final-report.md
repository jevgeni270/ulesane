# Final Test Report – MiniShop

Team: Student 1 & Student 2  
Repository: minishop-team  

## 1. Decision: RELEASABLE – All layers green, 0 open defects

## 2. Summary Table (Before vs After)
| Layer | Tests | Before (Pass/Fail) | After (Pass/Fail) | Defects Found -> Fixed |
|---|---|---|---|---|
| Unit (Jest) | 35 | 29 / 6 | 35 / 0 | 4 -> 4 |
| API | 10 | 7 / 3 | 10 / 0 | 3 -> 3 |
| UI + Mobile | 42 | 36 / 6 | 42 / 0 | 0 new (shared logic defects fixed) |

## 3. Fixed Defects Summary
| Defect ID | Layer | Severity | Fixed in Commit |
|---|---|---|---|
| D-L-01 | Unit | Medium | Fix D-L-01: sort products numerically by price |
| D-L-02 | Unit / UI | High | Fix D-L-02: calculate discount for full subtotal |
| D-L-03 | Unit | Medium | Fix D-L-03: return 1 for non-positive or falsy quantity |
| D-L-04 | Unit | Medium | Fix D-L-04: require TLD in email validation regex |
| D-A-01 | API | High | Fix D-A-01: return 404 for missing item ID |
| D-A-02 | API | High | Fix D-A-02: validate qty >= 0 in POST /items |
| D-A-03 | API | Medium | Fix D-A-03: send 204 status on successful DELETE |

## 4. Traceability
Full requirement traceability is documented in `traceability.md`.

## 5. Unit vs UI Layer Comparison
Unit tests detected business logic errors instantly (execution time < 1s) and pinpointed the exact file and line number. UI tests detected the same underlying logic errors through user interface symptoms, but required full browser launch. Finding and resolving bugs at the unit layer significantly reduces debugging costs and execution time.

## 6. Residual Risk
- API response content types (REQ-API-08) were verified manually.
- Security and concurrent modifications were not tested.

## 7. Lessons Learned
1. Writing tests strictly against specifications prevents test implementation bias.
2. Boundary testing (e.g. `qty: 0` and `qty: -1`) is critical for backend validation.
3. Automated multi-layer regression pipelines ensure that backend logic fixes immediately resolve dependent UI tests.