import {WiPayAuth, WiPayVoucher} from '../src';
import { API } from '../src/config';

const config = {
    AccountNumber: 2000,
    ApiKey: "samplekey",
}

let config2 = {
    AccountNumber: 2002,
    ApiKey: "samplekey2"
}

describe('WiPay Core Authorisation Module', () => {
    it('Only allows Singleton instance.', () => {
        let o:WiPayAuth = WiPayAuth.getInstance(config);
        let o2:WiPayAuth = WiPayAuth.getInstance(config);
        expect(o).toStrictEqual(o2);
        expect(o).toBeInstanceOf(WiPayAuth);
        expect(o2).toBeInstanceOf(WiPayAuth);
    })

    it('Has immutable config options.', () => {
        let o:WiPayAuth = WiPayAuth.getInstance(config);
        
        let o2:WiPayAuth = WiPayAuth.getInstance(config2);
        expect(o).toStrictEqual(o2);
        expect(config).toStrictEqual(o.Config);
        expect(o.Config).toBe(o2.Config);
    })

    it('Uses appropriate API endpoint.', () => {
        let o:WiPayAuth = WiPayAuth.getInstance(config);
        expect(o.Endpoint).toBe(API.Live);
        o.LiveMode = false;
        expect(o.Endpoint).toBe(API.Sandbox);
    })
});