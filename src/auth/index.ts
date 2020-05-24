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

    private constructor (config: WiPayConfig) {
        WiPayAuth._config = config;
        WiPayAuth._endpoint = (config.Sandbox) ? API.Sandbox : API.Live
    }

    public static getInstance = (config: WiPayConfig): WiPayAuth => {
        if (WiPayAuth._instance) return WiPayAuth._instance;
        else {
            return WiPayAuth._instance = new WiPayAuth(config);
        }
    }

    public get Config (): WiPayConfig { return WiPayAuth._config; }
    public get Endpoint (): string { return WiPayAuth._endpoint; }
}

export default WiPayAuth;