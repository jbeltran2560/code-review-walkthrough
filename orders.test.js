const { processOrder } = require("./orders");

test("regular customer pays no discount", () => {
  const items = [{ price: 10.0, qty: 2 }];
  expect(processOrder("regular", items)).toBeCloseTo(21.65);
});

test("member gets ten percent off", () => {
  const items = [{ price: 10.0, qty: 2 }];
  expect(processOrder("member", items)).toBeCloseTo(19.485);
});