"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthManager {
    constructor() {
    }
    checkReqAuth(req) {
        const headerAuth = req.headers.authorization;
        if (headerAuth) {
            const token = headerAuth.split(' ')[1];
            const validToken = this.validateToken(token);
            if (validToken === true) {
                return true;
            }
            else {
                const error = new Error("Invalid token.");
                console.log(error);
                return false;
            }
        }
        else {
            const error = new Error("Req without auth token.");
            console.log(error);
            return false;
        }
    }
    validateToken(token) {
        try {
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "abrakadabraaa");
            return true;
        }
        catch (err) {
            console.log(err, ', when validating token.');
            return err;
        }
    }
}
exports.AuthManager = AuthManager;
