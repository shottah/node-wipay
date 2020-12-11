import WiPayAuth, {WiPayAuthConfig} from './auth';
import WiPayVoucher, {WiPayVoucherResponse} from './voucher';
import WiPayGateway, {Currency, WiPayGatewayConfig} from './creditcard';

const Wipay = {
    Auth: WiPayAuth,
    Gateway: WiPayGateway,
    voucher: WiPayVoucher
}

export {
    Currency,
    WiPayGatewayConfig,
    WiPayVoucherResponse,
    WiPayAuthConfig
}

export default Wipay;