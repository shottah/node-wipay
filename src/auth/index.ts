import {API, Gateway} from '../config';

interface WiPayConfig {
AccountNumber: number,
DeveloperID?: number,
MerchantKey?: number,
ApiKey: string,
Sandbox?: false
}

/**
 * Authorisation Class
 * @param {WiPayConfig} config
 * @return {WiPayAuth}
 */
class WiPayAuth {
    private static _instance: WiPayAuth;
    private static _config: WiPayConfig;
    private static _endpoint: string;
    private static _gateway: string;
    private static _mode: boolean;

    /**
     * Authorisation Constructor
     * This function is private to allow for Singleton design.
     * @param {WiPayConfig} config
     */
    private constructor(config: WiPayConfig) {
      WiPayAuth._config = config;
      WiPayAuth._endpoint = config.Sandbox ? API.Sandbox : API.Live;
      WiPayAuth._gateway = config.Sandbox ? Gateway.Sandbox : Gateway.Live;
      this.LiveMode = true;
    }

    /**
     * Get Authorisation Instance
     * @param {WiPayConfig} config
     * @return {WiPayAuth}
     */
    public static getInstance = (config: WiPayConfig): WiPayAuth => {
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
      return WiPayAuth._mode;
    }

    /**
     * Live Mode
     * This function will set the LiveMode, for the authorisation module to use
     * the live or sandbox API endpoint.
     * @param {boolean} isLive
     */
    public set LiveMode(isLive: boolean) {
      WiPayAuth._mode = isLive;
      WiPayAuth._endpoint = isLive ? API.Live : API.Sandbox;
      WiPayAuth._gateway = isLive ? Gateway.Live : Gateway.Sandbox;
    }

    /**
     * Config
     * This function returns the configuration of this authorisation module.
     * @return {WiPayConfig}
     */
    public get Config(): WiPayConfig {
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
