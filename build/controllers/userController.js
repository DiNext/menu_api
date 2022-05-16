"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require('bcrypt');
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req['body'];
                if (user.login == undefined || user.password == undefined) {
                    const error = new Error("Incorrect req");
                    res.status(404).send("Incorrect req");
                    return error;
                }
                const existingUser = yield this.userService.getUser(user);
                if (!existingUser) {
                    const error = new Error("No such user, please check details");
                    res.status(404).send("No such user, please check details");
                    return error;
                }
                const correctPass = yield bcrypt.compare(user.password, existingUser.password);
                if (correctPass) {
                    const token = this.generateJWT(existingUser);
                    res.status(200).send({
                        success: true,
                        data: {
                            userId: existingUser.id,
                            login: existingUser.login,
                            token: token
                        }
                    });
                }
                else {
                    const error = new Error("Wrong password, please check details");
                    res.status(404).send("Wrong password, please check details");
                    return error;
                }
            }
            catch (err) {
                console.log(err, ', when login.');
                res.status(404).send('Something went wrong');
                return err;
            }
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = req['body'];
                const existingUser = yield this.userService.getUser(newUser);
                if (existingUser) {
                    const error = new Error("User already exists");
                    res.status(404).send('User already exists');
                    return error;
                }
                const passwordToSave = yield bcrypt.hash(newUser.password, this.salt);
                newUser.password = passwordToSave;
                yield this.userService.create(newUser);
                const token = this.generateJWT(newUser);
                res.status(201).json({ success: true,
                    data: { userId: newUser.id, login: newUser.login, token: token } });
            }
            catch (err) {
                console.log(err, ', when signup.');
                res.status(404).send('Something went wrong');
                return err;
            }
        });
        this.userService = new userService_1.UserService();
        this.salt = bcrypt.genSaltSync(10);
        this.router = (0, express_1.Router)();
        this.routes();
    }
    generateJWT(user) {
        return jsonwebtoken_1.default.sign({ userId: user.id, login: user.login }, process.env.SECRET_KEY || "abrakadabraaa", { expiresIn: "24h" });
    }
    routes() {
        this.router.post('/login', this.login);
        this.router.post('/signup', this.signUp);
    }
}
exports.AuthController = AuthController;
