import {WiPayAuth, WiPayGateway, WiPayGatewayConfig, WiPayVoucher} from '../src';
import { API } from '../src/config';

const config = {
    AccountNumber: 2000,
    ApiKey: "samplekey",
}

let config2 = {
    AccountNumber: 2002,
    ApiKey: "samplekey2"
}

let gatewayConfig: WiPayGatewayConfig = {
    OrderID: 1000,
    Total: 10,
    PhoneNumber: '8884447777',
    Email: 'test@npm.com',
    Name: 'Test Test',
    RedirectUrl: 'http://localhost:3001/verify',
};

describe('WiPay Core Authorisation Module', () => {
    it('Only allows Singleton instance.', () => {
        let o:WiPayAuth = WiPayAuth.getInstance(config);
        let o2:WiPayAuth = WiPayAuth.getInstance(config);
        expect(o).toStrictEqual(o2);
        expect(o).toBeInstanceOf(WiPayAuth);
        expect(o2).toBeInstanceOf(WiPayAuth);
    });

    it('Can retrieve an instance without parameters', () => {
        let o:WiPayAuth = WiPayAuth.getInstance();
        expect(o).toBeInstanceOf(WiPayAuth);
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

describe('WiPay Core Gateway Module.', () => {
    it('Is not a singleton.', () => {
        let o:WiPayGateway = new WiPayGateway(WiPayAuth.getInstance(), gatewayConfig);
        let o2: WiPayGateway = new WiPayGateway(WiPayAuth.getInstance(), gatewayConfig);

        expect(o).not.toStrictEqual(o2)
        expect(o).toBeInstanceOf(WiPayGateway);
        expect(o2).toBeInstanceOf(WiPayGateway);
    });

    it('Builds a Gateway endpoint that meets required query params.', () => {
        let o: WiPayGateway = new WiPayGateway(WiPayAuth.getInstance(), gatewayConfig);
        let s: string = o.constructGatewayEndpoint();

        let e: string [] = ['name', 'phone', 'email', 'order_id', 'developer_id', 'total', 'return_url'];

        e.forEach(word => {
            expect(s.includes(word)).toBeTruthy();
        });
    });

    it('Builds a Payment endpoint that meets required query params.', () => {
        let o: WiPayGateway = new WiPayGateway(WiPayAuth.getInstance(), gatewayConfig);

        let e: string [] = ['account_number', 'currency', 'fee_structure', 'order_id', 'return_url', 'total',];

        expect(o.constructPaymentEndpoint).toThrowError();
    });
})