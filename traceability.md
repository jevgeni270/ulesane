# Traceability Matrix

| REQ | Test cases | Automated tests | Layer | Last result | Defect |
|---|---|---|---|---|---|
| REQ-L-01 | TC-L-01, TC-L-02 | UT-01...UT-04 | unit | PASS | |
| REQ-L-02 | TC-L-03, TC-L-04 | UT-05...UT-08 | unit | UT-07 FAIL | D-L-01 |
| REQ-L-03 | TC-L-05 | UT-09, UT-10 | unit | PASS | |
| REQ-L-04 | TC-L-06 | UT-11...UT-15 | unit | UT-13 FAIL | D-L-02 |
| REQ-L-05 | TC-L-07, TC-L-08 | UT-16, UT-17 | unit | UT-17 FAIL | D-L-03 |
| REQ-L-06 | TC-L-09 | UT-18...UT-20 | unit | PASS | |
| REQ-L-07 | TC-L-10 | UT-21...UT-25 | unit | UT-24 FAIL | D-L-04 |
| REQ-API-01 | TC-01 | TC-01 | api | PASS | |
| REQ-API-02 | TC-02, TC-03 | TC-02, TC-03 | api | TC-03 FAIL | D-A-01 |
| REQ-API-03 | TC-04...TC-06 | TC-04...TC-06 | api | TC-06 FAIL | D-A-02 |
| REQ-API-04 | TC-07 | TC-07 | api | PASS | |
| REQ-API-05 | TC-08 | TC-08 | api | PASS | |
| REQ-API-06 | TC-09, TC-10 | TC-09, TC-10 | api | TC-09 FAIL | D-A-03 |
| REQ-API-07 | TC-09 | TC-09 | api | PASS | |
| REQ-API-08 | - | - | api | NOT TESTED | |
| REQ-UI-10 | UI-15, UI-16 | UI-15, UI-16 | UI | UI-16 FAIL | D-L-02 (same root cause) |