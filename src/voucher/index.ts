import WiPayAuth from "../auth";
import axios from 'axios';

interface WiPayVoucherResponse {
    status: String,
    msg: String,
    trxn_id?: String,
    value?: Number,
}

type WiPayVoucherReason = "This is a voucher payment.";

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

    public pay = async (voucher: String, total: Number, details?: WiPayVoucherReason) : Promise<WiPayVoucherResponse> => {
        if (voucher.length != 12) throw new Error("Invalid voucher length");
        if (total <= 0) throw new Error("Invalid total must be greater than zero.");
        
        const response = await axios.post(
            this._authorisation.Endpoint +
            'voucher_pay', 
            {
                account_number: this._authorisation.Config.AccountNumber,
                developer_id: undefined,
                details: details,
                total: total,
                voucher: voucher
            }
        );

        const result: WiPayVoucherResponse = {
            status: response.data.status,
            msg: response.data.msg,
            trxn_id: response.data.trxn_id,
            value: response.data.value
        }

        return result;
    }
}

export default WiPayVoucher;