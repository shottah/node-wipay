import WiPayAuth, {WiPayAuthConfig} from './auth';
import WiPayVoucher, {WiPayVoucherResponse} from './voucher';
import WiPayGateway, {WiPayGatewayConfig} from './creditcard';

const Wipay = {
    Auth: WiPayAuth,
    Gateway: WiPayGateway,
    voucher: WiPayVoucher
}

export {
    WiPayGatewayConfig,
    WiPayVoucherResponse,
    WiPayAuthConfig
}

export default Wipay;