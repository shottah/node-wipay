import WiPayAuth from "../auth";

interface WiPayGatewayConfig {
    PhoneNumber: Number,
    Email: String,
    Name: String,
    OrderID: Number,
    RedirectURL: String,
    Total: Number
}

class WiPayGateway {
    private _auth: WiPayAuth;
    private _config: WiPayGatewayConfig;
    public constructor (auth: WiPayAuth, config: WiPayGatewayConfig) {
        this._auth = auth;
        this._config = config;
    }

    public constructUrl = (): String => {
        return (
            this._auth.Gateway + 
            '?total=' + this._config.Total,
            '?phone=' + this._config.PhoneNumber,
            '?email=' + this._config.Email,
            '?name=' + this._config.Name,
            '?order_id=' + this._config.OrderID,
            '?developer_id=' + this._auth.Config.AccountNumber
        )
    }
}

export default WiPayGateway;