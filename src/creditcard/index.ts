import WiPayAuth from '../auth';
const WiPayTransactions = require('wipay-transaction');

export type Currency = {
  TTD: 'TTD',
  USD: 'USD',
};

export type WiPayGatewayConfig = {
    OrderID: number,
    Total: number,
    FeeStructure: 1 | 2 | 3,
    RedirectUrl: string,
    Currency: Currency
    // Deprecated Query Params
    PhoneNumber?: string,
    Email?: string,
    Name?: string,
};

const a:WiPayGatewayConfig {
  FeeStructure: FeeStructureType.CustomerPay
}

export type WiPayGateWayResponse = {
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
};

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

    public constructEndpoint = (): string => (
      `${this._auth.Gateway}` + 
        `?total=${this._config.Total}` +
        `&fee_structure=${this._config.FeeStructure}` +
        `&order_id=${this._config.OrderID}` +
        `&account_number=${this._auth.Config.AccountNumber}` +
        `&return_url=${this._config.RedirectUrl}` +
        `&currency=${this._config.Currency}`
    );

    /**
     * Construct Gateway URL
     * This function returns the Gateway Endpoint to be used.
     * @return {string}
     */
    public constructUrl = (): string => (
      `${this._auth.Gateway}` +
        `?total=${this._config.Total}` +
        `&phone=${this._config.PhoneNumber}` +
        `&email=${this._config.Email}` +
        `&name=${this._config.Name}` +
        `&account_number=${this._auth.Config.AccountNumber.toString()}` + 
        `&order_id=${this._config.OrderID}` +
        `&return_url=${this._config.RedirectUrl}`
    )

    /**
     * Verify Hashsum
     * This function verifies that the hashsum returned from the Gateway Request was valid.
     * @param {WiPayGateWayResponse} response The response from the WiPay Gateway request.
     */
    public verify = (response: WiPayGateWayResponse, key: string): boolean => {
      return WiPayTransactions(response).verifyHash(key);
    }
}

export default WiPayGateway;
