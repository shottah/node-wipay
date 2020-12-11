export const API = {
  Live: 'https://wipayfinancial.com/v1/',
  Sandbox: 'https://sandbox.wipayfinancial.com/v1/',
};

export const Gateway = {
  Live: API.Live + 'payments/select',
  Sandbox: API.Sandbox + 'payments/select',
};
