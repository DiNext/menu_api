"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
class AuthController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    login() {
        console.log('log');
    }
    signUp() {
    }
    routes() {
        this.router.post('/login', this.login);
        this.router.post('/signup', this.signUp);
    }
}
exports.AuthController = AuthController;
