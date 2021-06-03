export const API = {
  Live: 'https://wipayfinancial.com/v1/',
  Sandbox: 'https://sandbox.wipayfinancial.com/v1/',
};

export const Gateway2 = {
  Live: API.Live + 'gateway_live',
  Sandbox: API.Sandbox + 'gateway',
}

export const Gateway = {
  Live: API.Live + 'payments/select',
  Sandbox: API.Sandbox + 'payments/select',
};
