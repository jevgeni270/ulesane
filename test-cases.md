# Test Case Specification – MiniShop

## A. Business logic (shop-logic.js) – executed as Jest unit tests
| TC | REQ | Prio | Input | Expected | Automated as |
|---|---|---|---|---|---|
| TC-L-01 | REQ-L-01 | High | filterProducts(PRODUCTS, '') | 4 products | UT-01 |
| TC-L-02 | REQ-L-01 | High | filterProducts(PRODUCTS, 'mouse') | 1 product ('Wireless Mouse') | UT-02 |
| TC-L-03 | REQ-L-02 | High | sortProducts(PRODUCTS, 'name') | Sorted A->Z | UT-05 |
| TC-L-04 | REQ-L-02 | High | sortProducts(PRODUCTS, 'price-desc') | Most expensive first (249.00) | UT-07 |
| TC-L-05 | REQ-L-03 | High | lineTotal(39, 2) | 78 | UT-09 |
| TC-L-06 | REQ-L-04 | High | cartTotals(rows, 0.10) | { subtotal: 63.5, discount: 6.35, total: 57.15 } | UT-13 |
| TC-L-07 | REQ-L-05 | High | normalizeQuantity(0) | 1 | UT-17 |
| TC-L-08 | REQ-L-05 | High | normalizeQuantity(2.7) | 2 | UT-16 |
| TC-L-09 | REQ-L-06 | Medium | discountRateFor(' SAVE10 ') | 0.10 | UT-19 |
| TC-L-10 | REQ-L-07 | High | validateCheckout({ email: 'mari@example' }) | Error on email (requires .tld) | UT-24 |

## B. Inventory API (server.js) – executed as Playwright API tests
Precondition for all: server running, POST /reset done (2 items: id 1 'A-1' qty 5, id 2 'B-2' qty 0).

| TC | REQ | Prio | Request (method, path, body) | Expected status | Expected body | Type |
|---|---|---|---|---|---|---|
| TC-01 | REQ-API-01 | High | GET /items | 200 | array of 2 items | positive |
| TC-02 | REQ-API-02 | High | GET /items/1 | 200 | { id: 1, sku: 'A-1', qty: 5 } | positive |
| TC-03 | REQ-API-02 | High | GET /items/999 | 404 | { error: 'not found' } | negative |
| TC-04 | REQ-API-03 | High | POST /items { sku: 'C-3', qty: 10 } | 201 | { id: 3, sku: 'C-3', qty: 10 } | positive |
| TC-05 | REQ-API-03 | High | POST /items { sku: 'C-3', qty: 0 } | 201 | { id: 3, sku: 'C-3', qty: 0 } | boundary |
| TC-06 | REQ-API-03 | High | POST /items { sku: 'C-3', qty: -1 } | 400 | { error: 'invalid qty' } | boundary |
| TC-07 | REQ-API-04 | Medium | POST /items { sku: 'invalid sku!', qty: 1 } | 400 | { error: 'invalid sku' } | negative |
| TC-08 | REQ-API-05 | High | PUT /items/1 { sku: 'A-1', qty: 20 } | 200 | { id: 1, sku: 'A-1', qty: 20 } | positive |
| TC-09 | REQ-API-06 | High | DELETE /items/1 | 204 | empty body | positive |
| TC-10 | REQ-API-06 | High | DELETE /items/999 | 404 | { error: 'not found' } | negative |