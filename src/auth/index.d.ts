interface WiPayConfig {
    AccountNumber: Number;
    API_Key: String;
}
declare class WiPayAuth {
    private static _instance;
    private static _config;
    private constructor();
    getInstance: (config: WiPayConfig) => WiPayAuth;
}
export default WiPayAuth;
//# sourceMappingURL=index.d.ts.map