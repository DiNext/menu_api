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
exports.PostController = void 0;
const express_1 = require("express");
const postService_1 = require("../services/postService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class PostController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const headerAuth = req.headers.authorization;
                if (headerAuth) {
                    const token = headerAuth.split(' ')[1];
                    const validToken = this.validateToken(token);
                    if (validToken) {
                        const posts = yield this.postService.index();
                        res.send(posts);
                    }
                    else {
                        const error = new Error("User is not authorized");
                        console.log(error);
                        res.status(404).send('User is not authorized');
                        return error;
                    }
                }
            }
            catch (_a) {
                const error = new Error("Error! Something went wrong.");
                console.log(error);
                res.status(404).send('Error occured.');
                return error;
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const headerAuth = req.headers.authorization;
                if (headerAuth) {
                    const token = headerAuth.split(' ')[1];
                    const validToken = this.validateToken(token);
                    if (validToken) {
                        const post = req['body'];
                        post.date = new Date().toLocaleString('ru').toString();
                        const newPost = yield this.postService.create(post);
                        res.send(newPost);
                    }
                    else {
                        const error = new Error("User is not authorized");
                        console.log(error);
                        res.status(404).send('User is not authorized');
                        return error;
                    }
                }
            }
            catch (_b) {
                const error = new Error("Error! Something went wrong.");
                console.log(error);
                res.status(404).send('Error occured.');
                return error;
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const headerAuth = req.headers.authorization;
                if (headerAuth) {
                    const token = headerAuth.split(' ')[1];
                    const validToken = this.validateToken(token);
                    if (validToken) {
                        const post = req['body'];
                        const id = req['query']['id'];
                        const updatedPost = yield this.postService.update(post, Number(id));
                        res.send(updatedPost);
                    }
                    else {
                        const error = new Error("User is not authorized");
                        console.log(error);
                        res.status(404).send('User is not authorized');
                        return error;
                    }
                }
            }
            catch (_c) {
                const error = new Error("Error! Something went wrong.");
                console.log(error);
                res.status(404).send('Error occured.');
                return error;
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const headerAuth = req.headers.authorization;
                if (headerAuth) {
                    const token = headerAuth.split(' ')[1];
                    const validToken = this.validateToken(token);
                    if (validToken) {
                        const id = req['query']['id'];
                        const deletedPost = yield this.postService.delete(Number(id));
                        res.send(deletedPost);
                    }
                    else {
                        const error = new Error("User is not authorized");
                        console.log(error);
                        res.status(404).send('User is not authorized');
                        return error;
                    }
                }
            }
            catch (_d) {
                const error = new Error("Error! Something went wrong.");
                console.log(error);
                res.status(404).send('Error occured.');
                return error;
            }
        });
        this.postService = new postService_1.PostService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    validateToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "abrakadabraaa");
    }
    routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/', this.update);
        this.router.delete('/', this.delete);
    }
}
exports.PostController = PostController;
