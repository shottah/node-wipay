import WiPayAuth, {WiPayAuthConfig} from './auth';
import WiPayVoucher, {WiPayVoucherResponse} from './voucher';
import WiPayGateway, {Currency, FeeStructureType, WiPayGatewayConfig} from './creditcard';

const Wipay = {
    Auth: WiPayAuth,
    Gateway: WiPayGateway,
    voucher: WiPayVoucher
}

export {
    Currency,
    FeeStructureType,
    WiPayGatewayConfig,
    WiPayVoucherResponse,
    WiPayAuthConfig
}

export default Wipay;