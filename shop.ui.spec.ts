import { test, expect } from './fixtures';

test('UI-01 products page shows 6 products', async ({ shop }) => {
  await expect(shop.products()).toHaveCount(6);
  await expect(shop.pageHeading('Products')).toBeVisible();
});

test('UI-02 search filters products without case sensitivity', async ({ shop }) => {
  await shop.search('wireless');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products().first()).toContainText('Wireless Mouse');
});

test('UI-03 search with no matches shows zero products', async ({ shop }) => {
  await shop.search('not-a-real-product');
  await expect(shop.products()).toHaveCount(0);
  await expect(shop.resultCount()).toHaveText('0 products');
});

test('UI-04 adding a product increases the basket badge to 1', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await expect(shop.cartCount()).toHaveText('1');
});

test('UI-05 basket shows the selected product', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();
  await expect(shop.pageHeading('Your basket')).toBeVisible();
  await expect(shop.cartRows()).toContainText('USB-C Hub');
});

test('UI-06 checkout rejects an invalid email address', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'invalid-email', 'Pikk 1, Tallinn');
  await expect(shop.error('email')).toHaveText('Enter a valid email address');
});

test('UI-07 empty basket message is shown after removing the only product', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();
  await shop.remove('USB-C Hub');
  await expect(shop.page.getByTestId('cart-empty')).toHaveText('Your basket is empty');
});

test('UI-08 checkout rejects a missing full name', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('', 'mari@example.com', 'Pikk 1, Tallinn');
  await expect(shop.error('name')).toHaveText('Enter your full name');
});

test('UI-09 checkout rejects a missing delivery address', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@example.com', '');
  await expect(shop.error('address')).toHaveText('Enter a delivery address');
});

test('UI-10 valid checkout confirms the order', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@example.com', 'Pikk 1, Tallinn');
  await expect(shop.confirmation()).toContainText('Order #');
});
