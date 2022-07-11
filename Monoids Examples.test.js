// Example 1
const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  toString: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);

// Example 2
const Product = x => ({
  x,
  concat: ({ x: y }) => Product(x * y),
  toString: () => `Product(${x})`
});
Product.empty = () => Product(1);

// Example 3
const Any = x => ({
  x,
  concat: ({ x: y }) => Any(x || y),
  toString: () => `Any(${x})`
});
Any.empty = () => Any(false);

// Example 4
const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  toString: () => `All(${x})`
});
All.empty = () => All(true);

// Example 5
const Max = x => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y),
  toString: () => `Max(${x})`
});
Max.empty = () => Max(-Infinity);

// Example 6
const Min = x => ({
  x,
  concat: ({ x: y }) => Min(x < y ? x : y),
  toString: () => `Min(${x})`
});
Min.empty = () => Min(Infinity);

// Example 7
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  concat: o => o.fold(e => Left(e), r => Right(x.concat(r))),
  toString: () => `Right(${x})`
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  concat: o => Left(x),
  toString: () => `Left(${x})`
});



// Calls
const res1 = Sum.empty().concat(Sum(1)).concat(Sum(2)).toString();
const res2 = Product.empty().concat(Product(1)).concat(Product(2)).toString();
const res3 = Any.empty().concat(Any(true)).concat(Any(false)).toString();
const res4 = All.empty().concat(All(true)).concat(All(false)).toString();
const res5 = Max.empty().concat(Max(5)).concat(Max(8)).toString();
const res6 = Min.empty().concat(Min(1)).concat(Min(2)).toString();




// Tests
test("Sum = 3", () => {
  expect(res1).toBe("Sum(3)");
});

test("Product = 2", () => {
  expect(res2).toBe("Product(2)");
});

test("Any = true", () => {
  expect(res3).toBe("Any(true)");
});

test("All = false", () => {
  expect(res4).toBe("All(false)");
});

test("Max = 8", () => {
  expect(res5).toBe("Max(8)");
});

test("Min = 1", () => {
  expect(res6).toBe("Min(1)");
});