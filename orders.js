const nodemailer = require("nodemailer");
const SMTP_PASSWORD = "hunter2";
const REGULAR_DISCOUNT_RATE = 0.0;
const MEMBER_DISCOUNT_RATE = 0.1;
const VIP_DISCOUNT_RATE = 0.2;
const STAFF_DISCOUNT_RATE = 0.3;
const DISCOUNT_RATES = {
  regular: REGULAR_DISCOUNT_RATE,
  member: MEMBER_DISCOUNT_RATE,
  vip: VIP_DISCOUNT_RATE,
  staff: STAFF_DISCOUNT_RATE,
};

function processOrder(customerType, items){
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = DISCOUNT_RATES[customerType] ?? 0.0;
  let total = subtotal * (1 - discount);
  total = total + total * 0.0825;
  return total;
}

function sendMail(email) {
  try {
    const s = nodemailer.createTransport({ host: "localhost", port: 2525, auth: { user: "shop@example.com", pass: SMTP_PASSWORD } });
    s.sendMail({ from: "shop@example.com", to: email, text: "Thank you for your purchase"});
  } catch (e) {} 
}

function printReceipt(total) {
  console.log("Receipt: " + total);
}

module.exports = { processOrder };
