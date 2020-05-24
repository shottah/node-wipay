const WiPayAuth = require('../lib').WiPayAuth;
const WiPayVoucher = require('../lib').WiPayVoucher
const WiPayGateway = require('../lib').WiPayGateway;
const api = WiPayAuth.getInstance({
    AccountNumber: 4630,
    API_KEY: "u9ufe8afj89ea",
    Sandbox: true,
})

const vou = new WiPayVoucher(api);
vou.check('jxaqe48tfvbs')
.catch(res => console.log(res))
.then(err => console.log(err));

vou.pay('jxaqe48tfvbs', 0.01, "Voucher payment for testing.")
.then(res => console.log(res))
.catch(err => console.log(err));

