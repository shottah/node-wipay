const WiPayAuth = require('../lib').WiPayAuth;
const WiPayVoucher = require('../lib').WiPayVoucher

const api = WiPayAuth.getInstance({
    AccountNumber: 4630,
    API_KEY: "u9ufe8afj89ea",
    Sandbox: true,
})

const vou = new WiPayVoucher(api);
vou.check('uyr8vmap230t')
.catch(res => console.log(res))
.then(err => console.log(err));

vou.pay('uyr8vmap230t', 0.01, "Voucher payment for testing.")
.then(res => console.log(res))
.catch(err => console.log(err));