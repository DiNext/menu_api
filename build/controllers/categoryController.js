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
exports.CategoryController = void 0;
const express_1 = require("express");
const categoryService_1 = require("../services/categoryService");
const authManager_1 = require("../managers/authManager");
class CategoryController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.index();
                res.send(categories);
            }
            catch (err) {
                console.log(err, ', when getting posts.');
                res.status(404).send('Error occured.');
                return err;
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const successAuth = this.authManager.checkReqAuth(req);
                if (successAuth) {
                    const category = req['body'];
                    const newCategory = yield this.categoryService.create(category);
                    res.send(newCategory);
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
                    const category = req['body'];
                    const id = req['query']['id'];
                    const updatedCategory = yield this.categoryService.update(category, Number(id));
                    res.send(updatedCategory);
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
                    const deletedCategory = yield this.categoryService.delete(Number(id));
                    res.send(deletedCategory);
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
        this.categoryService = new categoryService_1.CategoryService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/', this.update);
        this.router.delete('/', this.delete);
    }
}
exports.CategoryController = CategoryController;
