import { test, expect } from './fixtures';

test.describe('sorting', () => {
  test('UI-11 REQ-UI-08 cheapest product is first when sorting low to high', async ({ shop }) => {
    await shop.sortBy('Price: low to high');
    await expect(shop.products().first()).toContainText('Wireless Mouse');
    await expect(shop.prices().first()).toHaveText('24.50 €');
  });

  test('UI-12 REQ-UI-08 most expensive product is first when sorting high to low', async ({ shop }) => {
    await shop.sortBy('Price: high to low');
    await expect(shop.products().first()).toContainText('Monitor 27"');
    await expect(shop.prices().first()).toHaveText('249.00 €');
  });
});

test.describe('quantity', () => {
  test('UI-13 REQ-UI-09 quantity three updates line total and total', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    await shop.setQuantity('USB-C Hub', 3);
    await expect(shop.lineTotal('USB-C Hub')).toHaveText('117.00 €');
    await expect(shop.cartTotal()).toHaveText('117.00 €');
  });

  test('UI-14 REQ-UI-09 quantity cannot be less than one', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    await shop.setQuantity('USB-C Hub', 0);
    await expect(shop.quantityInput('USB-C Hub')).toHaveValue('1');
    await expect(shop.cartCount()).toHaveText('1');
  });
});

test.describe('discount codes', () => {
  test('UI-15 REQ-UI-10 SAVE10 discounts a single-product basket by 10 percent', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    await shop.applyDiscount('SAVE10');
    await expect(shop.cartSubtotal()).toHaveText('39.00 €');
    await expect(shop.cartDiscount()).toHaveText('−3.90 €');
    await expect(shop.cartTotal()).toHaveText('35.10 €');
  });

  test('UI-16 REQ-UI-10 SAVE10 discounts the whole basket', async ({ shop }) => {
    await test.step('add two different products', async () => {
      await shop.add('USB-C Hub');
      await shop.add('Wireless Mouse');
      await shop.openCart();
      await expect(shop.cartSubtotal()).toHaveText('63.50 €');
    });
    await test.step('apply SAVE10', async () => {
      await shop.applyDiscount('SAVE10');
      await expect(shop.cartDiscount()).toHaveText('−6.35 €');
      await expect(shop.cartTotal()).toHaveText('57.15 €');
    });
  });

  test('UI-17 REQ-UI-11 unknown discount code shows an error and does not change the total', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    const before = await shop.cartTotal().textContent();
    await shop.applyDiscount('UNKNOWN');
    await expect(shop.discountMessage()).toHaveText('Invalid code');
    await expect(shop.cartTotal()).toHaveText(before || '');
  });
});

const invalidEmails = [
  { email: 'plainaddress', why: 'missing-at-and-domain' },
  { email: 'mari@', why: 'missing-domain' },
  { email: '@example.com', why: 'missing-local-part' },
  { email: 'mari@example', why: 'missing-domain-suffix' },
];

for (const { email, why } of invalidEmails) {
  test(`UI-18 email "${email}" is rejected (${why})`, async ({ shop }) => {
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await shop.checkout('Mari Maasikas', email, 'Pikk 1, Tallinn');
    await expect(shop.error('email')).toHaveText('Enter a valid email address');
  });
}
