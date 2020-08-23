import { API, Gateway } from '../config';

export interface WiPayAuthConfig {
  AccountNumber: number,
  DeveloperID?: number,
  MerchantKey?: number,
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
  private static _LiveMode: boolean

  /**
   * Authorisation Constructor
   * This function is private to allow for Singleton design.
   * @param {WiPayAuthConfig} config
   */
  private constructor(config: WiPayAuthConfig) {
    WiPayAuth._config = config;
    WiPayAuth._endpoint = config.LiveMode ?  API.Live : API.Sandbox
    WiPayAuth._gateway = config.LiveMode ?  Gateway.Live: Gateway.Sandbox;
    WiPayAuth._LiveMode = config.LiveMode ? true : false;
  }

  /**
   * Get Authorisation Instance
   * @param {WiPayAuthConfig} config
   * @return {WiPayAuth}
   */
  public static getInstance = (config: WiPayAuthConfig): WiPayAuth => {
    if (WiPayAuth._instance) {
      return WiPayAuth._instance;
    }

    return WiPayAuth._instance = new WiPayAuth(config);
  }

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
    WiPayAuth._gateway = isLive ? Gateway.Live : Gateway.Sandbox;
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
