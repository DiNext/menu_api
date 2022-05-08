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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserService {
    constructor() {
        this.getUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usr = yield this.userRepository.findOne({ where: { login: user.login } });
                return usr;
            }
            catch (_a) {
                const error = new Error("Error! Something went wrong.");
                console.log(error);
            }
        });
        this.create = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userRepository.save(user);
                return newUser;
            }
            catch (_b) {
                const error = new Error("Error! Something went wrong.");
                console.log(error);
            }
        });
        this.userRepository = userRepository_1.UserRepository;
    }
}
exports.UserService = UserService;
