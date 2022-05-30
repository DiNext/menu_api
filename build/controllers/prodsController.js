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
exports.ProdsController = void 0;
const express_1 = require("express");
const prodsService_1 = require("../services/prodsService");
const authManager_1 = require("../managers/authManager");
class ProdsController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const prods = yield this.prodsService.index();
                res.send(prods);
            }
            catch (err) {
                console.log(err, ', when getting posts.');
                res.status(404).send('Error occured.');
                return err;
            }
        });
        this.find = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const successAuth = this.authManager.checkReqAuth(req);
                if (successAuth) {
                    const id = req['query']['id'];
                    const prods = yield this.prodsService.findByParent(Number(id));
                    res.send(prods);
                }
                else {
                    const error = new Error("User is not authorized");
                    console.log(error);
                    res.status(404).send('User is not authorized');
                    return error;
                }
            }
            catch (err) {
                console.log(err, ', when creating post.');
                res.status(404).send('Error occured.');
                return err;
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const successAuth = this.authManager.checkReqAuth(req);
                if (successAuth) {
                    const prod = req['body'];
                    const newProd = yield this.prodsService.create(prod);
                    res.send(newProd);
                }
                else {
                    const error = new Error("User is not authorized");
                    console.log(error);
                    res.status(404).send('User is not authorized');
                    return error;
                }
            }
            catch (err) {
                console.log(err, ', when creating post.');
                res.status(404).send('Error occured.');
                return err;
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const successAuth = this.authManager.checkReqAuth(req);
                if (successAuth) {
                    const prod = req['body'];
                    const id = req['query']['id'];
                    const updatedProd = yield this.prodsService.update(prod, Number(id));
                    res.send(updatedProd);
                }
                else {
                    const error = new Error("User is not authorized");
                    console.log(error);
                    res.status(404).send('User is not authorized');
                    return error;
                }
            }
            catch (err) {
                console.log(err, ', when updating post');
                res.status(404).send('Error occured.');
                return err;
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const successAuth = this.authManager.checkReqAuth(req);
                if (successAuth) {
                    const id = req['query']['id'];
                    const deletedProd = yield this.prodsService.delete(Number(id));
                    res.send(deletedProd);
                }
                else {
                    const error = new Error("User is not authorized");
                    console.log(error);
                    res.status(404).send('User is not authorized');
                    return error;
                }
            }
            catch (err) {
                console.log(err, ', when deleting post.');
                res.status(404).send('Error occured.');
                return err;
            }
        });
        this.authManager = new authManager_1.AuthManager();
        this.prodsService = new prodsService_1.ProdsService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', this.index);
        this.router.get('/find', this.find);
        this.router.post('/', this.create);
        this.router.put('/', this.update);
        this.router.delete('/', this.delete);
    }
}
exports.ProdsController = ProdsController;
