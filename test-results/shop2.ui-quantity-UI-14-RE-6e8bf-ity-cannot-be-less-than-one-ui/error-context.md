# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shop2.ui.spec.ts >> quantity >> UI-14 REQ-UI-09 quantity cannot be less than one
- Location: shop2.ui.spec.ts:26:7

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByRole('spinbutton', { name: 'Quantity for USB-C Hub' })
Expected: "1"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" getByRole('spinbutton', { name: 'Quantity for USB-C Hub' }) with timeout 5000ms
  - waiting for getByRole('spinbutton', { name: 'Quantity for USB-C Hub' })
    14 × locator resolved to <input value="0" data-qty="2" type="number" aria-label="Quantity for USB-C Hub"/>
       - unexpected value "0"

```

```yaml
- spinbutton "Quantity for USB-C Hub": "0"
```

# Test source

```ts
  1  | import { test, expect } from './fixtures';
  2  | 
  3  | test.describe('sorting', () => {
  4  |   test('UI-11 REQ-UI-08 cheapest product is first when sorting low to high', async ({ shop }) => {
  5  |     await shop.sortBy('Price: low to high');
  6  |     await expect(shop.products().first()).toContainText('Wireless Mouse');
  7  |     await expect(shop.prices().first()).toHaveText('24.50 €');
  8  |   });
  9  | 
  10 |   test('UI-12 REQ-UI-08 most expensive product is first when sorting high to low', async ({ shop }) => {
  11 |     await shop.sortBy('Price: high to low');
  12 |     await expect(shop.products().first()).toContainText('Monitor 27"');
  13 |     await expect(shop.prices().first()).toHaveText('249.00 €');
  14 |   });
  15 | });
  16 | 
  17 | test.describe('quantity', () => {
  18 |   test('UI-13 REQ-UI-09 quantity three updates line total and total', async ({ shop }) => {
  19 |     await shop.add('USB-C Hub');
  20 |     await shop.openCart();
  21 |     await shop.setQuantity('USB-C Hub', 3);
  22 |     await expect(shop.lineTotal('USB-C Hub')).toHaveText('117.00 €');
  23 |     await expect(shop.cartTotal()).toHaveText('117.00 €');
  24 |   });
  25 | 
  26 |   test('UI-14 REQ-UI-09 quantity cannot be less than one', async ({ shop }) => {
  27 |     await shop.add('USB-C Hub');
  28 |     await shop.openCart();
  29 |     await shop.setQuantity('USB-C Hub', 0);
> 30 |     await expect(shop.quantityInput('USB-C Hub')).toHaveValue('1');
     |                                                   ^ Error: expect(locator).toHaveValue(expected) failed
  31 |     await expect(shop.cartCount()).toHaveText('1');
  32 |   });
  33 | });
  34 | 
  35 | test.describe('discount codes', () => {
  36 |   test('UI-15 REQ-UI-10 SAVE10 discounts a single-product basket by 10 percent', async ({ shop }) => {
  37 |     await shop.add('USB-C Hub');
  38 |     await shop.openCart();
  39 |     await shop.applyDiscount('SAVE10');
  40 |     await expect(shop.cartSubtotal()).toHaveText('39.00 €');
  41 |     await expect(shop.cartDiscount()).toHaveText('−3.90 €');
  42 |     await expect(shop.cartTotal()).toHaveText('35.10 €');
  43 |   });
  44 | 
  45 |   test('UI-16 REQ-UI-10 SAVE10 discounts the whole basket', async ({ shop }) => {
  46 |     await test.step('add two different products', async () => {
  47 |       await shop.add('USB-C Hub');
  48 |       await shop.add('Wireless Mouse');
  49 |       await shop.openCart();
  50 |       await expect(shop.cartSubtotal()).toHaveText('63.50 €');
  51 |     });
  52 |     await test.step('apply SAVE10', async () => {
  53 |       await shop.applyDiscount('SAVE10');
  54 |       await expect(shop.cartDiscount()).toHaveText('−6.35 €');
  55 |       await expect(shop.cartTotal()).toHaveText('57.15 €');
  56 |     });
  57 |   });
  58 | 
  59 |   test('UI-17 REQ-UI-11 unknown discount code shows an error and does not change the total', async ({ shop }) => {
  60 |     await shop.add('USB-C Hub');
  61 |     await shop.openCart();
  62 |     const before = await shop.cartTotal().textContent();
  63 |     await shop.applyDiscount('UNKNOWN');
  64 |     await expect(shop.discountMessage()).toHaveText('Invalid code');
  65 |     await expect(shop.cartTotal()).toHaveText(before || '');
  66 |   });
  67 | });
  68 | 
  69 | const invalidEmails = [
  70 |   { email: 'plainaddress', why: 'missing-at-and-domain' },
  71 |   { email: 'mari@', why: 'missing-domain' },
  72 |   { email: '@example.com', why: 'missing-local-part' },
  73 |   { email: 'mari@example', why: 'missing-domain-suffix' },
  74 | ];
  75 | 
  76 | for (const { email, why } of invalidEmails) {
  77 |   test(`UI-18 email "${email}" is rejected (${why})`, async ({ shop }) => {
  78 |     await shop.add('Wireless Mouse');
  79 |     await shop.openCart();
  80 |     await shop.checkout('Mari Maasikas', email, 'Pikk 1, Tallinn');
  81 |     await expect(shop.error('email')).toHaveText('Enter a valid email address');
  82 |   });
  83 | }
  84 | 
```