# Node WiPay

This is a Node Wrapper for the WiPay Caribbean V1 API written in TypeScript.

## Getting Started

### Installation

### Basic Use

#### Creating an Auth instance

```ts
const auth = WiPayAuth({
    AccountNumber: Number,
    API_Key: String,
});
```

#### Testing in Sandbox Mode

```ts
auth.LiveMode = false;
```

#### Making Voucher API Call.

```ts
const handler = new WiPayVoucher(auth);
handler.check(voucher:String)
    .then((result:WiPayVoucherResponse) => {
        console.log(result);
    })
    .catch((error:WiPayVoucherResponse) => {
        console.log(error);
    });
```
---

## WiPayAuth
This class is designed as a singleton object in order to create an immutable and fault-tolerant instance of the required WiPay configuration information.

### WiPayAuthConfig

This configuration interface defines the required configuration information for a WiPay authentication instance to be sucessful.

```ts
interface WiPayAuthConfig {
    AccountNumber: Number,
    API_Key: String,
}
```

Using this format you can initialise an authorisation object by doing the following:

```ts
const config;
const wipay_auth = WiPayAuth.getInstance(config:WiPayAuthConfig);
wipay.LiveMode = false or true; // LiveMode is true by default
```

> It is important to note that the `_config` of the `WiPayAuth` is immutable and cannot be modified, although the `LiveMode:Boolean` can be toggled for `Live` and `Sandbox`. Also as a Singleton object, the typical class constructor is private to prevent unwanted duplication.

### Voucher API

> The `WiPayVoucher` functions returns a `Promise<WiPayVoucherResponse>`. The structure of the response is as follows.

```ts
interface WiPayVoucherResponse {
    status: String,
    msg: String,
    trxn_id?: String,
    value?: Number,
}
```

Before any calls can be made to the object, it needs to be initialised witha valid authorisation object.

```ts
const handler = new WiPayVoucher(auth:WiPayAuth);
```



#### Check

```ts
handler.check(voucher:String)
    .then((result:WiPayVoucherResponse) => {
        console.log(result);
    })
    .catch((error:WiPayVoucherResponse) => {
        console.log(error);
    });
```

#### Pay

```ts
handler.pay(voucher:String, total:Number, details?:String)
    .then((result:WiPayVoucher) => {
        console.log(`Transaction ID is ${result.trxn_id}`);
    })
    .catch((error:WiPayVoucherResponse) => {
        console.log(`Payment failed due to: [${error.msg}]`);
    })
```
