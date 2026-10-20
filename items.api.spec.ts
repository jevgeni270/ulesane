import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
  await request.post('/reset');
});

test('TC-01 GET /items returns 200 and array of items', async ({ request }) => {
  const res = await request.get('/items');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBe(2);
});

test('TC-02 GET /items/1 returns 200 and item', async ({ request }) => {
  const res = await request.get('/items/1');
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ id: 1, sku: 'A-1', qty: 5 });
});

test('TC-03 GET /items/999 returns 404 with error body', async ({ request }) => {
  const res = await request.get('/items/999');
  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ error: 'not found' });
});

test('TC-04 POST /items with valid body returns 201', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: 10 } });
  expect(res.status()).toBe(201);
  expect(await res.json()).toEqual({ id: 3, sku: 'C-3', qty: 10 });
});

test('TC-05 POST /items with qty 0 returns 201', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: 0 } });
  expect(res.status()).toBe(201);
});

test('TC-06 POST /items with qty -1 returns 400', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: -1 } });
  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: 'invalid qty' });
});

test('TC-07 POST /items with invalid sku returns 400', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'bad sku!', qty: 1 } });
  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: 'invalid sku' });
});

test('TC-08 PUT /items/1 updates item', async ({ request }) => {
  const res = await request.put('/items/1', { data: { sku: 'A-1', qty: 20 } });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ id: 1, sku: 'A-1', qty: 20 });
});

test('TC-09 DELETE /items/1 returns 204 without body', async ({ request }) => {
  const res = await request.delete('/items/1');
  expect(res.status()).toBe(204);
  expect(await res.text()).toBe('');
});

test('TC-10 DELETE /items/999 returns 404', async ({ request }) => {
  const res = await request.delete('/items/999');
  expect(res.status()).toBe(404);
});