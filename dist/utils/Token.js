"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUtils = void 0;
class TokenUtils {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    getToken(auth) {
        return this.jwtService.decode(auth.split(" ")[1]).sub();
    }
}
exports.TokenUtils = TokenUtils;
//# sourceMappingURL=Token.js.map