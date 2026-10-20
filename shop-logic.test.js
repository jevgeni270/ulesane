const { 
  filterProducts, 
  sortProducts, 
  lineTotal, 
  cartTotals, 
  normalizeQuantity, 
  discountRateFor, 
  validateCheckout 
} = require('./shop-logic');

const PRODUCTS = [
  { id: 1, name: 'Laptop Stand', price: 29.90 },
  { id: 2, name: 'USB-C Hub', price: 39.00 },
  { id: 3, name: 'Monitor 27"', price: 249.00 },
  { id: 4, name: 'Wireless Mouse', price: 24.50 },
];

describe('filterProducts', () => {
  test('UT-01 empty query returns all products', () => {
    expect(filterProducts(PRODUCTS, '')).toHaveLength(4);
  });
  test('UT-02 "mouse" (lower case) finds Wireless Mouse', () => {
    const res = filterProducts(PRODUCTS, 'mouse');
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('Wireless Mouse');
  });
  test('UT-03 no match returns empty array', () => {
    expect(filterProducts(PRODUCTS, 'tablet')).toEqual([]);
  });
  test('UT-04 undefined query behaves like empty', () => {
    expect(filterProducts(PRODUCTS, undefined)).toHaveLength(4);
  });
});

describe('sortProducts', () => {
  test('UT-05 name sorts A->Z', () => {
    const sorted = sortProducts(PRODUCTS, 'name');
    expect(sorted.map(p => p.name)).toEqual([
      'Laptop Stand', 'Monitor 27"', 'USB-C Hub', 'Wireless Mouse'
    ]);
  });
  test('UT-06 price-asc puts cheapest first', () => {
    const sorted = sortProducts(PRODUCTS, 'price-asc');
    expect(sorted[0].price).toBe(24.50);
  });
  test('UT-07 price-desc puts most expensive first', () => {
    expect(sorted[0].price).toBe(249.00);
  });
  test('UT-08 does not mutate input array', () => {
    const copy = [...PRODUCTS];
    sortProducts(PRODUCTS, 'price-asc');
    expect(PRODUCTS).toEqual(copy);
  });
});

describe('lineTotal', () => {
  test('UT-09 price x qty', () => {
    expect(lineTotal(39, 2)).toBe(78);
    expect(lineTotal(24.5, 3)).toBe(73.5);
  });
  test('UT-10 rounds to 2 decimals', () => {
    expect(lineTotal(0.1, 3)).toBe(0.3);
  });
});

describe('cartTotals', () => {
  const rows = [{ price: 39, qty: 1 }, { price: 24.5, qty: 1 }];

  test('UT-11 subtotal sums all rows', () => {
    expect(cartTotals(rows).subtotal).toBe(63.5);
  });
  test('UT-12 no discount -> total = subtotal', () => {
    const res = cartTotals(rows, 0);
    expect(res.discount).toBe(0);
    expect(res.total).toBe(63.5);
  });
  test('UT-13 10% discount applies to the whole basket', () => {
    expect(cartTotals(rows, 0.10)).toEqual({ subtotal: 63.5, discount: 6.35, total: 57.15 });
  });
  test('UT-14 empty basket returns zeros', () => {
    expect(cartTotals([])).toEqual({ subtotal: 0, discount: 0, total: 0 });
  });
  test('UT-15 quantity is respected', () => {
    const customRows = [{ price: 39, qty: 3 }];
    expect(cartTotals(customRows).subtotal).toBe(117);
  });
});

describe('normalizeQuantity', () => {
  test.each([
    [3, 3],
    ['3', 3],
    [2.7, 2],
    [1, 1]
  ])('UT-16 valid quantity %p -> %p', (input, expected) => {
    expect(normalizeQuantity(input)).toBe(expected);
  });

  test.each([
    [0, 1],
    [-5, 1],
    ['abc', 1],
    ['', 1],
    [null, 1]
  ])('UT-17 invalid quantity %p -> %p', (input, expected) => {
    expect(normalizeQuantity(input)).toBe(expected);
  });
});

describe('discountRateFor', () => {
  test('UT-18 SAVE10 -> 0.10', () => {
    expect(discountRateFor('SAVE10')).toBe(0.10);
  });
  test('UT-19 case-insensitive and trimmed', () => {
    expect(discountRateFor(' save20 ')).toBe(0.20);
  });
  test('UT-20 unknown -> 0', () => {
    expect(discountRateFor('UNKNOWN')).toBe(0);
    expect(discountRateFor('')).toBe(0);
  });
});

describe('validateCheckout', () => {
  test('UT-21 valid input -> no errors', () => {
    const errors = validateCheckout({ name: 'Mari Maasikas', email: 'mari@example.com', address: 'Tallinn' });
    expect(errors).toEqual({});
  });
  test('UT-22 empty input -> three errors', () => {
    const errors = validateCheckout({});
    expect(Object.keys(errors)).toHaveLength(3);
  });
  test('UT-23 name validation (min 2 chars)', () => {
    expect(validateCheckout({ name: 'M', email: 'a@b.com', address: 'Tallinn' }).name).toBeDefined();
    expect(validateCheckout({ name: 'Ma', email: 'a@b.com', address: 'Tallinn' }).name).toBeUndefined();
  });
  test.each([
    ['mari'],
    ['mari@'],
    ['mari@example'],
    ['mari maasikas@example.com']
  ])('UT-24 invalid email %p rejected', (email) => {
    const errors = validateCheckout({ name: 'Mari', email, address: 'Tallinn' });
    expect(errors.email).toBeDefined();
  });
  test('UT-25 empty/whitespace address rejected', () => {
    const errors = validateCheckout({ name: 'Mari', email: 'mari@example.com', address: '   ' });
    expect(errors.address).toBeDefined();
  });
});