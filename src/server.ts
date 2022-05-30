import express, {Request, Response} from 'express';
import { AuthController } from './controllers/userController';
import {CategoryController} from './controllers/categoryController';
import {ProdsController} from './controllers/prodsController';
import { PostgresDataSource } from './postgresDataSource'
const cors = require('cors');

class Server{
    private categoryController: CategoryController;
    private authController: AuthController;
    private app: express.Application;
    private prodsController: ProdsController;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    public configuration(){
        this.app.use(cors());
        this.app.set("port", process.env.PORT || 3001);
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

        this.categoryController = new CategoryController();
        this.authController = new AuthController();
        this.prodsController = new ProdsController();

        this.app.use('/auth', this.authController.router);
        this.app.use('/api/category/', this.categoryController.router);
        this.app.use('/api/prods/', this.prodsController.router);
    }
 
    public start(){
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server is listening ${this.app.get("port")} port.`);
        });
    }
}

const server = new Server();
server.start();