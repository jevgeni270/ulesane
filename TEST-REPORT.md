# Test report – 20/10/2026, 09:06:23

**Verdict: RED – 8 failing test(s), do not release**

| Total | Passed | Failed | Flaky | Skipped | Pass rate | Duration |
|---|---|---|---|---|---|---|
| 44 | 36 | 8 | 0 | 0 | 82 % | 79.3 s |

## By project

| Project | Passed | Failed | Flaky | Skipped |
|---|---|---|---|---|
| ui | 18 | 4 | 0 | 0 |
| mobile | 18 | 4 | 0 | 0 |

## Failed tests (8)

| ID | Test | Project | File | Error |
|---|---|---|---|---|
| UI-18 | UI-18 email "mari@example" is rejected (missing-domain-suffix) | ui | shop2.ui.spec.ts | Expected: "Enter a valid email address" · Received: "" |
| UI-18 | UI-18 email "mari@example" is rejected (missing-domain-suffix) | mobile | shop2.ui.spec.ts | Expected: "Enter a valid email address" · Received: "" |
| UI-12 | sorting › UI-12 REQ-UI-08 most expensive product is first when sorting high to low | ui | shop2.ui.spec.ts | Expected: Monitor 27" · Received: Mechanical Keyboard |
| UI-12 | sorting › UI-12 REQ-UI-08 most expensive product is first when sorting high to low | mobile | shop2.ui.spec.ts | Expected: Monitor 27" · Received: Mechanical Keyboard |
| UI-14 | quantity › UI-14 REQ-UI-09 quantity cannot be less than one | ui | shop2.ui.spec.ts | Expected: "1" · Received: "0" |
| UI-14 | quantity › UI-14 REQ-UI-09 quantity cannot be less than one | mobile | shop2.ui.spec.ts | Expected: "1" · Received: "0" |
| UI-16 | discount codes › UI-16 REQ-UI-10 SAVE10 discounts the whole basket | ui | shop2.ui.spec.ts | Expected: "−6.35 €" · Received: "−3.90 €" |
| UI-16 | discount codes › UI-16 REQ-UI-10 SAVE10 discounts the whole basket | mobile | shop2.ui.spec.ts | Expected: "−6.35 €" · Received: "−3.90 €" |

## Slowest tests

- 5.5 s – discount codes › UI-16 REQ-UI-10 SAVE10 discounts the whole basket [mobile]
- 5.5 s – UI-18 email "mari@example" is rejected (missing-domain-suffix) [mobile]
- 5.5 s – quantity › UI-14 REQ-UI-09 quantity cannot be less than one [mobile]

## Evidence

- HTML report with traces and screenshots: `playwright-report/index.html` (`npm run report`)
- Machine-readable: `test-results/junit.xml`, `test-results/results.json`
