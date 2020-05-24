import WiPayAuth from "../auth";

class WiPayVoucher {
    private _authorisation: WiPayAuth;

    public constructor (authorisation: WiPayAuth) {
        this._authorisation = authorisation;
    }

    public check = () : Boolean => {
        return false;
    }

    public pay = () : any => {
        return false;
    }
}

export default WiPayVoucher;