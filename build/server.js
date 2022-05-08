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
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const postController_1 = require("./controllers/postController");
const postgresDataSource_1 = require("./postgresDataSource");
const cors = require('cors');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
        this.routes();
    }
    configuration() {
        this.app.use(cors());
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express_1.default.json());
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield postgresDataSource_1.PostgresDataSource.initialize()
                .then(() => {
                console.log("Data Source has been initialized!");
            })
                .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });
            this.postController = new postController_1.PostController();
            this.authController = new userController_1.AuthController();
            this.app.use('/auth', this.authController.router);
            this.app.use('/api/posts/', this.postController.router);
        });
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server is listening ${this.app.get("port")} port.`);
        });
    }
}
const server = new Server();
server.start();
