import WiPayAuth from '../auth';
import axios from 'axios';

export type WiPayVoucherResponse = {
    status: string,
    msg: string,
    transactionId?: string,
    value?: number,
}

type WiPayVoucherReason = 'This is a voucher payment.';

/**
 * something
 * @param {WiPayAuth} auth
 * @return {WiPayVoucher}
 */
class WiPayVoucher {
    private _authorisation: WiPayAuth;

    /**
    * WiPayVoucher Constructor
    * @param {WiPayAuth} authorisation
    */
    public constructor(authorisation: WiPayAuth) {
      this._authorisation = authorisation;
    }

	/**
	 * Makes a call to the Voucher API to check the value of a voucher.
	 * @param {string} voucher
	 * @return {Promise<WiPayVoucherResponse>}
	 */
	public check = async (voucher: string) : Promise<WiPayVoucherResponse> => {
	  if (voucher.length != 12) {
	    throw new Error('Invalid Voucher Length');
	  }
	  const response = await axios.post(
	      `${this._authorisation.Endpoint
	      }voucher_check`,
	      {
	        voucher: voucher,
	      },
	  );

	  const result: WiPayVoucherResponse = {
	    status: response.data.status,
	    msg: response.data.msg,
	    value: response.data.value,
	  };

	  return result;
	}

	/**
	 * Makes a Payment call to the Voucher API.
	 * @param {string} voucher
	 * @param {number} total
	 * @param {string} details
	 * @return {Promise<WiPayVoucherResponse>}
	 */
	public pay = async (voucher: string, total: number, details?: WiPayVoucherReason) : Promise<WiPayVoucherResponse> => {
	     if (voucher.length != 12) {
	       throw new Error('Invalid voucher length');
	     }
	     if (total <= 0) {
	       throw new Error('Invalid total must be greater than zero.');
	     }

	     const response = await axios.post(
	         `${this._authorisation.Endpoint
	         }voucher_pay`,
	         {
	           account_number: this._authorisation.Config.AccountNumber,
	           developer_id: undefined,
	           details: details,
	           total: total,
	           voucher: voucher,
	         },
	     );

	     const result: WiPayVoucherResponse = {
	       status: response.data.status,
	       msg: response.data.msg,
	       transactionId: response.data.transactionId,
	       value: response.data.value,
	     };

	     return result;
	   }
}

export default WiPayVoucher;
