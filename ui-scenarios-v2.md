# MiniShop v2 – UI test scenarios

| ID | Requirement | Scenario / input | Expected result |
|---|---|---|---|
| UI-11 | REQ-UI-08 | Sort price low to high | Wireless Mouse, 24.50 € is first |
| UI-12 | REQ-UI-08 | Sort price high to low | Monitor 27", 249.00 € is first |
| UI-13 | REQ-UI-09 | Set USB-C Hub quantity to 3 | Line total and basket total are 117.00 € |
| UI-14 | REQ-UI-09 | Set quantity to 0 | Quantity is clamped to 1; total stays valid |
| UI-15 | REQ-UI-10 | Apply SAVE10 to USB-C Hub | Discount 3.90 €, total 35.10 € |
| UI-16 | REQ-UI-10 | Add USB-C Hub and Wireless Mouse; apply SAVE10 | Subtotal 63.50 €, discount 6.35 €, total 57.15 € |
| UI-17 | REQ-UI-11 | Apply unknown discount code | “Invalid code”; total unchanged |
| UI-18a | REQ-UI-06 | Email `plainaddress` | Email validation error |
| UI-18b | REQ-UI-06 | Email `mari@` | Email validation error |
| UI-18c | REQ-UI-06 | Email `@example.com` | Email validation error |
| UI-18d | REQ-UI-06 | Email `mari@example` | Email validation error |

UI-18 is data-driven: four inputs run through one loop and appear as four separately named tests.
