import express, {Request, Response} from 'express';
import { AuthController } from './controllers/userController';
import {PostController} from './controllers/postController';
import { PostgresDataSource } from './postgresDataSource'
const cors = require('cors');

class Server{
    private postController: PostController;
    private authController: AuthController;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    public configuration(){
        this.app.use(cors());
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express.json());
    }

    public async routes(){
        await PostgresDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        this.postController = new PostController();
        this.authController = new AuthController();

        this.app.use('/auth', this.authController.router);
        this.app.use('/api/posts/', this.postController.router);
    }
 
    public start(){
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server is listening ${this.app.get("port")} port.`);
        });
    }
}

const server = new Server();
server.start();