import { API, Gateway, Gateway2 } from '../config';
import { WiPayGateWayResponse } from '../creditcard';
const WiPayTransactions = require('wipay-transaction');

export interface WiPayAuthConfig {
  AccountNumber: number,
  DeveloperID?: number,
  ApiKey: string,
  LiveMode?: boolean
}

/**
 * Authorisation Class
 * @param {WiPayAuthConfig} config
 * @return {WiPayAuth}
 */
class WiPayAuth {
  private static _instance: WiPayAuth;
  private static _config: WiPayAuthConfig;
  private static _endpoint: string;
  private static _gateway: string;
  private static _LiveMode: boolean;
  private static _Payments: boolean

  /**
   * Authorisation Constructor
   * This function is private to allow for Singleton design.
   * @param {WiPayAuthConfig} config
   */
  private constructor(config: WiPayAuthConfig, payments: boolean) {
    WiPayAuth._Payments = payments;
    WiPayAuth._config = config;
    WiPayAuth._endpoint = config.LiveMode !== false ?  API.Live : API.Sandbox
    if (WiPayAuth._Payments) WiPayAuth._gateway = config.LiveMode !== false ?  Gateway.Live: Gateway.Sandbox;
    else  WiPayAuth._gateway = config.LiveMode !== false ?  Gateway2.Live: Gateway2.Sandbox;
    WiPayAuth._LiveMode = config.LiveMode !== false ? true : false;
  }

  /**
   * Get Authorisation Instance
   * @param {WiPayAuthConfig} config
   * @return {WiPayAuth}
   */
  public static getInstance = (config: WiPayAuthConfig | null = null, payments:boolean = false): WiPayAuth => {
    if (WiPayAuth._instance) {
      return WiPayAuth._instance;
    }
    if (config === null || config === undefined) throw new Error("Cannot instantiate the authorisation with a null configuration.");
    return WiPayAuth._instance = new WiPayAuth(config, payments);
  }

  /**
   * Verify Hashsum
   * This function verifies that the hashsum returned from the Gateway Request was valid.
   * @param {WiPayGateWayResponse} response The response from the WiPay Gateway request.
   */
  public verify = (response: WiPayGateWayResponse): boolean => {
    return WiPayTransactions(response).verifyHash(this.Config.ApiKey);
  };

  /**
   * Live Mode
   * This function returns whether or not the authorisation module will use
   * the live or sandbox API endpoint.
   * @return {boolean}
   */
  public get LiveMode(): boolean {
    return WiPayAuth._LiveMode;
  }

  /**
   * Live Mode
   * This function will set the LiveMode, for the authorisation module to use
   * the live or sandbox API endpoint.
   * @param {boolean} isLive
   */
  public set LiveMode(isLive: boolean) {
    WiPayAuth._LiveMode = isLive;
    WiPayAuth._endpoint = isLive ? API.Live : API.Sandbox;
    if (WiPayAuth._Payments) WiPayAuth._gateway = isLive ?  Gateway.Live: Gateway.Sandbox;
    else  WiPayAuth._gateway = isLive ?  Gateway2.Live: Gateway2.Sandbox;
  }

  /**
   * Config
   * This function returns the configuration of this authorisation module.
   * @return {WiPayAuthConfig}
   */
  public get Config(): WiPayAuthConfig {
    return WiPayAuth._config;
  }

  /**
   * Endpoint
   * This function returns the API endpoint currently used by the
   * authorisation module.
   * @return {string}
   */
  public get Endpoint(): string {
    return WiPayAuth._endpoint;
  }

  /**
   * Gateway
   * This function returns the API Credit Card Gateway Endpoint currently
   * used by the authorisation module.
   */
  public get Gateway(): string {
    return WiPayAuth._gateway;
  }
}

export default WiPayAuth;
