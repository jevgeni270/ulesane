# Defect Register – MiniShop

## D-L-01 · sortProducts sorts prices lexicographically (as strings)
- Requirement: REQ-L-02
- Found by: UT-07 (unit)
- Severity: Medium
- Where: shop-logic.js, sortProducts()
- Expected: 249.00 comes before 89.00 in price-desc
- Actual: "89.00" comes before "249.00" because strings are sorted alphabetically
- Status: open

## D-L-02 · Discount is applied to the first row only
- Requirement: REQ-L-04 (and REQ-UI-10 as seen by user)
- Found by: UT-13 (unit), UI-16 (UI)
- Severity: High
- Where: shop-logic.js, cartTotals()
- Expected: discount 6.35, total 57.15
- Actual: discount 3.90, total 59.60
- Status: open

## D-L-03 · Quantity 0, empty string, and null normalize to 0 instead of 1
- Requirement: REQ-L-05
- Found by: UT-17 (unit)
- Severity: Medium
- Where: shop-logic.js, normalizeQuantity()
- Expected: normalizeQuantity(0) returns 1
- Actual: returns 0
- Status: open

## D-L-04 · Checkout email validation accepts addresses without TLD
- Requirement: REQ-L-07
- Found by: UT-24 (unit)
- Severity: Medium
- Where: shop-logic.js, validateCheckout()
- Expected: 'mari@example' rejected due to missing top-level domain (.tld)
- Actual: 'mari@example' passes validation
- Status: open

## D-A-01 · GET /items/:id returns 200 null for unknown ID
- Requirement: REQ-API-02
- Found by: TC-03 (api)
- Severity: High
- Where: server.js, GET /items/:id handler
- Expected: 404 { "error": "not found" }
- Actual: 200 null
- Status: open

## D-A-02 · POST /items accepts negative quantity (qty: -1)
- Requirement: REQ-API-03
- Found by: TC-06 (api)
- Severity: High
- Where: server.js, validation logic
- Expected: 400 { "error": "invalid qty" }
- Actual: 201 Created
- Status: open

## D-A-03 · DELETE /items/:id returns status 200 with JSON body instead of 204 No Content
- Requirement: REQ-API-06
- Found by: TC-09 (api)
- Severity: Medium
- Where: server.js, DELETE handler
- Expected: HTTP 204 without body
- Actual: HTTP 200 { "success": true }
- Status: open