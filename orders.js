const nodemailer = require("nodemailer");
const SMTP_PASSWORD = "hunter2";
const DISCOUNT_RATES = {
  regular: 0.0,
  member: 0.1,
  vip: 0.2,
  staff: 0.3,
};

function processOrder(customerType, items, email) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = DISCOUNT_RATES[customerType] ?? 0.0;
  let total = subtotal * (1 - discount);
  total = total + total * 0.0825;
  // ... email + console.log stay as they were for now
  try {
    const s = nodemailer.createTransport({ host: "localhost", port: 2525, auth: { user: "shop@example.com", pass: SMTP_PASSWORD } });
    s.sendMail({ from: "shop@example.com", to: email, text: "Your total is " + total });
  } catch (e) {}
  console.log("Receipt: " + total);
  return total;
}

module.exports = { processOrder };