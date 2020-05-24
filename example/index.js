const WiPayAuth = require('../lib').WiPayAuth;
const WiPayVoucher = require('../lib').WiPayVoucher
const WiPayGateway = require('../lib').WiPayGateway;
const express = require('express');
const app = express();

const auth = WiPayAuth.getInstance({
    AccountNumber: 4360,
    API_Key: "samplekey-unneeeded",
    Sandbox: true,
});

const voucher = new WiPayVoucher(auth);

app.use(express.urlencoded());

app.listen(3000, () => {
    console.log("Server running...");
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
})

app.post('/voucher_check', (req, res) => {
    console.log(req.body.voucher);
    voucher.check(req.body.voucher)
        .then(result => {
            console.log(result);
            res.json(result)
        })
        .catch(err => {
            res.json(err);
        })
})
