require('dotenv').config();
var braintree = require('braintree');

function generateTestBrainreeSampleNotification(
  merchantId,
  publicKey,
  privateKey,
  notificationKind,
  subscriptionId
) {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId,
    publicKey,
    privateKey,
  });

  const sampleNotification = gateway.webhookTesting.sampleNotification(
    notificationKind,
    subscriptionId
  );

  return {
    btSignature: sampleNotification.bt_signature,
    btPayload: sampleNotification.bt_payload,
  };
}

const express = require('express');
const app = express();
app.use(express.static('.'));

app.get('/generateTestBrainreeSampleNotification', (req, res) => {
  try {
    const data = generateTestBrainreeSampleNotification(
      req.query.merchantId,
      req.query.publicKey,
      req.query.privateKey,
      req.query.notificationKind,
      req.query.subscriptionId
    );
    res.json({ success: true, ...data });
  } catch (error) {
    res.json({ success: false });
  }
});

app.get('/index.html', (req, res) => {
  res.sendFile('index.html');
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/index.html`);
});
