import { Router, Response, Request } from "express";
import { ProdsEntity } from "../database/entites/prodsEntity";
import { ProdsService } from "../services/prodsService";
import { AuthManager } from "../managers/authManager";

export class ProdsController {
    public router: Router;
    private prodsService: ProdsService;
    private authManager: AuthManager;

    constructor() {
        this.authManager = new AuthManager();
        this.prodsService = new ProdsService();
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        try {
          const prods = await this.prodsService.index();
          res.send(prods); 
        } 
        catch(err) {
          console.log(err, ', when getting posts.')
          res.status(404).send('Error occured.');
          return err;
        }
    }

    public find = async (req: Request, res: Response) => {
        try {
          const successAuth = this.authManager.checkReqAuth(req) as boolean;

          if(successAuth) {
              const id = req['query']['id'];
              const prods = await this.prodsService.findByParent(Number(id)); 
              
              res.send(prods); 
          } else {
              const error = new Error("User is not authorized");
              console.log(error)
              res.status(404).send('User is not authorized');
              return error;
          }
        } 
        catch(err) {
          console.log(err, ', when creating post.')
          res.status(404).send('Error occured.');
          return err;
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
          const successAuth = this.authManager.checkReqAuth(req) as boolean;

          if(successAuth) {
              const prod = req['body'] as ProdsEntity;
              const newProd = await this.prodsService.create(prod);
              
              res.send(newProd);
          } else {
              const error = new Error("User is not authorized");
              console.log(error)
              res.status(404).send('User is not authorized');
              return error;
          }
        } 
        catch(err) {
          console.log(err, ', when creating post.')
          res.status(404).send('Error occured.');
          return err;
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
          const successAuth = this.authManager.checkReqAuth(req) as boolean;

          if(successAuth) {
              const prod = req['body'] as ProdsEntity;
              const id = req['query']['id'];
              const updatedProd= await this.prodsService.update(prod, Number(id))

              res.send(updatedProd);
          } else {
              const error = new Error("User is not authorized");
              console.log(error)
              res.status(404).send('User is not authorized');
              return error;
          }
        } 
        catch(err) {
          console.log(err, ', when updating post')
          res.status(404).send('Error occured.');
          return err;
        }
    }
    
    public delete = async (req: Request, res: Response) => {
        try {
          const successAuth = this.authManager.checkReqAuth(req) as boolean;

          if(successAuth) {
            const id = req['query']['id'];
            const deletedProd = await this.prodsService.delete(Number(id));

            res.send(deletedProd);
          } else {
              const error = new Error("User is not authorized");
              console.log(error)
              res.status(404).send('User is not authorized');
              return error;
          }
        } 
        catch(err) {
          console.log(err, ', when deleting post.')
          res.status(404).send('Error occured.');
          return err;
        }
    }

    public routes(){
        this.router.get('/', this.index);
        this.router.get('/find', this.find);
        this.router.post('/', this.create);
        this.router.put('/', this.update);
        this.router.delete('/', this.delete);
    }
}