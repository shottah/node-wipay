import WiPayAuth from '../auth';
const WiPayTransactions = require('wipay-transaction');

export type WiPayGatewayConfig = {
  OrderID: number,
  Total: number,
  PhoneNumber: string,
  Email: string,
  Name: string,
  RedirectUrl: string,
  // Query Params for Payment API
  FeeStructure?: 1 | 2 | 3,
  Currency?: 'TTD' | 'USD',
};

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


  /**
   * Construct Payment Endpoint
   * This function returns the Payment Endpoint to be used. Note 
   * that this endpoint is a wrapper around the Gateway endpoint 
   * and requires less parameters to be passed, but changes the 
   * user's experience.
   * @return {string}
   */
  public constructPaymentEndpoint = (): string => {
    throw new Error("Method not implemented.");
  };

  /**
   * Construct Gateway Endpoint
   * This function returns the Gateway Endpoint to be used. This is 
   * the base Gateway Endpoint and takes many standard parameters.
   * @return {string}
   */
  public constructGatewayEndpoint = (): string => {
    const endpoint = (
      `${this._auth.Gateway}` +
      `?name=${this._config.Name}` +
      `&phone=${this._config.PhoneNumber}` +
      `&email=${this._config.Email}` +
      `&total=${this._config.Total}` +
      `&currency=${this._config.Currency}` +
      `&order_id=${this._config.OrderID}` +
      `&developer_id=${this._auth.Config.DeveloperID}` +
      `&return_url=${this._config.RedirectUrl}`
    );

    return endpoint
  };


  /**
   * Verify Hashsum
   * This function verifies that the hashsum returned from the Gateway Request was valid.
   * @param {WiPayGateWayResponse} response The response from the WiPay Gateway request.
   */
  public verify = (response: WiPayGateWayResponse, key: string): boolean => {
    return WiPayTransactions(response).verifyHash(key);
  };
}

export default WiPayGateway;
