import WiPayAuth, {WiPayAuthConfig} from './auth';
import WiPayVoucher, {WiPayVoucherResponse} from './voucher';
import WiPayGateway, {Currency, FeeStructureType, WiPayGatewayConfig} from './creditcard';

const Wipay = {
    Service: {
        Auth: WiPayAuth,
        Gateway: WiPayGateway,
        voucher: WiPayVoucher
    }
}

export {
    Currency,
    FeeStructureType,
    WiPayVoucherResponse,
    WiPayAuthConfig
}

export default Wipay;