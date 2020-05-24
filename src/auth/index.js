"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WiPayAuth = /** @class */ (function () {
    function WiPayAuth(config) {
        this.getInstance = function (config) {
            if (WiPayAuth._instance)
                return WiPayAuth._instance;
            else {
                return new WiPayAuth(config);
            }
        };
        WiPayAuth._config = config;
    }
    return WiPayAuth;
}());
exports.default = WiPayAuth;
//# sourceMappingURL=index.js.map