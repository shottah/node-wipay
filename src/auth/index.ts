interface WiPayConfig {
    AccountNumber: Number,
    API_Key: String,
}

class WiPayAuth {
    private static _instance: WiPayAuth;
    private static _config: WiPayConfig;

    private constructor (config: WiPayConfig) {
        WiPayAuth._config = config;
    }

    public static getInstance = (config: WiPayConfig): WiPayAuth => {
        if (WiPayAuth._instance) return WiPayAuth._instance;
        else {
            return WiPayAuth._instance = new WiPayAuth(config);
        }
    }

    public get Config (): WiPayConfig { return WiPayAuth._config; }
}

export default WiPayAuth;