const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51QMqvzHqkh5hHCuXEr6mCk1a5cIsYAoCUY68gheZ7LxLSA40BZSrx37I68iooQ7PnrkVbe1xXaBqwI4dZZl5XUDK00JsbD7X79');

app.use(express.static("public"));
app.use(express.json());

const calculateTax = async (items, currency) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency,
    customer_details: {
      address: {
        line1: "920 5th Ave",
        city: "Seattle",
        state: "WA",
        postal_code: "98104",
        country: "US",
      },
      address_source: "shipping",
    },
    line_items: items.map((item) => buildLineItem(item)),
  });

  return taxCalculation;
};

const buildLineItem = (item) => {
  return {
    amount: item.amount, // Amount in cents
    reference: item.id, // Unique reference for the item in the scope of the calculation
  };
};

// Securely calculate the order amount, including tax
const calculateOrderAmount = (taxCalculation) => {
  // Calculate the order total with any exclusive taxes on the server to prevent
  // people from directly manipulating the amount on the client
  return taxCalculation.amount_total;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a Tax Calculation for the items being sold
  const taxCalculation = await calculateTax(items, 'gbp');
  const amount = await calculateOrderAmount(taxCalculation);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "gbp",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      tax_calculation: taxCalculation.id
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Invoke this method in your webhook handler when `payment_intent.succeeded` webhook is received
const handlePaymentIntentSucceeded = async (paymentIntent) => {
  // Create a Tax Transaction for the successful payment
  stripe.tax.transactions.createFromCalculation({
    calculation: paymentIntent.metadata['tax_calculation'],
    reference: 'myOrder_123', // Replace with a unique reference from your checkout/order system
  });
};

app.listen(4242, () => console.log("Node server listening on port 4242!"));