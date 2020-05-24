import { API } from "../config";

interface WiPayConfig {
    AccountNumber: Number,
    API_Key: String,
    Sandbox?: false
}

class WiPayAuth {
    private static _instance: WiPayAuth;
    private static _config: WiPayConfig;
    private static _endpoint: string;
    private static _mode: Boolean;

    private constructor (config: WiPayConfig) {
        WiPayAuth._config = config;
        WiPayAuth._endpoint = (config.Sandbox) ? API.Sandbox : API.Live
        this.LiveMode = true;
    }

    public static getInstance = (config: WiPayConfig): WiPayAuth => {
        if (WiPayAuth._instance) return WiPayAuth._instance;
        else {
            return WiPayAuth._instance = new WiPayAuth(config);
        }
    }
    
    public get LiveMode (): Boolean { return WiPayAuth._mode};
    public set LiveMode (isLive: Boolean) {
        WiPayAuth._mode = isLive;
        WiPayAuth._endpoint = isLive ? API.Live : API.Sandbox
    }
    public get Config (): WiPayConfig { return WiPayAuth._config; }
    public get Endpoint (): string { return WiPayAuth._endpoint; }
}

export default WiPayAuth;