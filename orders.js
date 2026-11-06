const nodemailer = require("nodemailer");
const SMTP_PASSWORD = "hunter2";

function processOrder(customerType, items, email) {
  let total = 0;
  for (const i of items) {
    total = total + i.price * i.qty;
  }
  if (customerType === "regular") {
    total = total;
  } else if (customerType === "member") {
    total = total * 0.9;
  } else if (customerType === "vip") {
    total = total * 0.8;
  }
  total = total + total * 0.0825;
  try {
    const s = nodemailer.createTransport({ host: "localhost", port: 2525, auth: { user: "shop@example.com", pass: SMTP_PASSWORD } });
    s.sendMail({ from: "shop@example.com", to: email, text: "Your total is " + total });
  } catch (e) {}
  console.log("Receipt: " + total);
  return total;
}

module.exports = { processOrder };