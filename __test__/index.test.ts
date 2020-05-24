import {WiPayAuth, WiPayVoucher} from '../src';

const config = {
    AccountNumber: 2000,
    API_Key: "samplekey"
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
        let newConfig = {
            AccountNumber: 2002,
            API_Key: "samplekey2"
        }
        let o2:WiPayAuth = WiPayAuth.getInstance(newConfig);
        expect(o).toStrictEqual(o2);
        expect(o.Config).toBe(o2.Config);
    })

    it('', () => {

    })
});

describe('WiPay Voucher Module', () => {
    it('Does something.', () => {
        expect(true).toBeFalsy();
    })
})