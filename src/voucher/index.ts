import WiPayAuth from "../auth";
import axios from 'axios';

interface WiPayVoucherResponse {
    status: String,
    msg: String,
    trxn_id?: String,
    value?: Number,
}

class WiPayVoucher {
    private _authorisation: WiPayAuth;

    public constructor (authorisation: WiPayAuth) {
        this._authorisation = authorisation;
    }

    public check = async (voucher: String) : Promise<WiPayVoucherResponse> => {
        if (voucher.length != 12) throw new Error("Invalid Voucher Length");
        const response = await axios.post(
            this._authorisation.Endpoint +
            'voucher_check',
            {
                voucher: voucher
            }
        );

        const result: WiPayVoucherResponse = {
            status: response.data.status,
            msg: response.data.msg,
            value: response.data.value
        }

        return result;
    }
    }

    public pay = () : any => {
        return false;
    }
}

export default WiPayVoucher;