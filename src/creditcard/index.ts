import WiPayAuth from '../auth';
const WiPayTransactions = require('wipay-transaction');

export interface WiPayGatewayConfig {
    PhoneNumber: number,
    Email: string,
    Name: string,
    OrderID: number,
    RedirectURL: string,
    Total: number
}

export interface WiPayGateWayResponse {
  status: string,
  name: string,
  email: string,
  hash?: string,
  order_id: number,
  transaction_id: string,
  reasonCode: number,
  reasonDescription: string,
  responseCode: number,
  total: number,
  D: string,
  date: string
}

/**
 * WiPay Gateway Class
 * This class handles the Credit Card Gateway Endpoint Operations.
 * @param {WiPayAuth} auth
 * @param {WiPayGatewayConfig} config
 * @return {WiPayGateway}
 */
class WiPayGateway {
    private _auth: WiPayAuth;
    private _config: WiPayGatewayConfig;

    /**
     * WiPay Gateway Constructor
     * Creates and initialises the WiPay Gateway object.
     * @param {WiPayAuth} auth
     * @param {WiPayGatewayConfig} config
     */
    public constructor(auth: WiPayAuth, config: WiPayGatewayConfig) {
      this._auth = auth;
      this._config = config;
    }

    /**
     * Construct Gateway URL
     * This function returns the Gateway Endpoint to be used.
     * @return {string}
     */
    public constructUrl = (): string => (
      `${this._auth.Gateway}` +
        `?total=${this._config.Total}` +
        `?phone=${this._config.PhoneNumber}` +
        `?email=${this._config.Email}` +
        `?name=${this._config.Name}` +
        `?order_id=${this._config.OrderID}` +
        `?return_url=${this._config.RedirectURL}` +
        `?developer_id=${this._auth.Config.AccountNumber}`
    )

    /**
     * Verify Hashsum
     * This function verifies that the hashsum returned from the Gateway Request was valid.
     * @param {WiPayGateWayResponse} response The response from the WiPay Gateway request.
     */
    public verify = (response: WiPayGateWayResponse, key: string): boolean => {
      // return WiPayTransactions(response).verifyHash(key);
      return false;
    }
}

export default WiPayGateway;
