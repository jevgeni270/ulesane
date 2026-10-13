# UI test report v2 – MiniShop

Team: [Jevgeni Pavlov ja Sergey Maksimov] · Repo: [https://github.com/jevgeni270/ulesane] · Branch: `ui-v2` · CI run: [ссылка на Actions]

## 1. Maintenance (v1 → v2)

- Tests red after v2: 7 of 10 (as described in the handout).
- Real defects among those 7: 0; the failures were outdated locators/text.
- Locator changes in `shop.page.ts`: 2 (`Add … to cart` → `Buy …`; `Cart` → `Basket`).
- Visible text updates in old tests: update cart heading/empty message to “Your basket” / “Your basket is empty”.

## 2. New scenarios and results

| ID | Requirement | Before fix | Defect |
|---|---|---|---|
| UI-11 | REQ-UI-08 | PASS | – |
| UI-12 | REQ-UI-08 | FAIL before fix; PASS after | D-04 |
| UI-13 | REQ-UI-09 | PASS | – |
| UI-14 | REQ-UI-09 | FAIL before fix; PASS after | D-06 |
| UI-15 | REQ-UI-10 | PASS | – |
| UI-16 | REQ-UI-10 | FAIL before fix; PASS after | D-05 |
| UI-17 | REQ-UI-11 | PASS | – |
| UI-18 | REQ-UI-06 | 4 data-driven cases PASS | – |

## 3. Flaky test

- Before fix: variable result due to a fixed 700 ms sleep and a one-time `isVisible()` check.
- Cause: the confirmation appears asynchronously after 300–1200 ms.
- Fix: `await expect(shop.confirmation()).toContainText('Order #')`.
- After fix: expected 0 failures in 6 repeated runs; run locally to record the actual measured result.

## 4. Defects

| ID | Location | Expected | Actual before fix | Fix |
|---|---|---|---|---|
| D-04 | `shop.js` / `sortProducts` | Numeric price order | Prices compared as strings | `a.price - b.price` / `b.price - a.price` |
| D-05 | `shop.js` / `renderCart` | 10% of whole subtotal | 10% of first row only | `subtotal * discountRate` |
| D-06 | `shop.js` / quantity change | Quantity ≥ 1 | Quantity 0 accepted | Clamp to integer ≥ 1 |

## 5. Mobile

- Playwright project: `mobile` using Pixel 7 device settings.
- Run `npx playwright test --project=ui --project=mobile`.
- Fill in actual result after execution: [desktop count] desktop, [mobile count] mobile.

## 6. CI

- Workflow: `.github/workflows/ui-tests.yml`.
- Trigger: push and pull request.
- Report artifact: `playwright-report`, retention 14 days.
- Fill in the Actions run URL and actual final result after pushing to GitHub.

## 7. What we would do next

- Run a small smoke-test subset on every push.
- Add visual regression checks with `toHaveScreenshot()`.
