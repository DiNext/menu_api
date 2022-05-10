import { Router, Response, Request } from "express";
import { CategoryEntity } from "../database/entites/categoryEntity";
import { CategoryService } from "../services/categoryService";
import { AuthManager } from "../managers/authManager";

export class CategoryController {
    public router: Router;
    private categoryService: CategoryService;
    private authManager: AuthManager;

    constructor() {
        this.authManager = new AuthManager();
        this.categoryService = new CategoryService();
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        try {
          const categories = await this.categoryService.index();
          res.send(categories); 
        } 
        catch(err) {
          console.log(err, ', when getting posts.')
          res.status(404).send('Error occured.');
          return err;
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
          const successAuth = this.authManager.checkReqAuth(req) as boolean;

          if(successAuth) {
              const category = req['body'] as CategoryEntity;
              const newCategory = await this.categoryService.create(category);
              
              res.send(newCategory);
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
              const category = req['body'] as CategoryEntity;
              const id = req['query']['id'];
              const updatedCategory = await this.categoryService.update(category, Number(id))

              res.send(updatedCategory);
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
            const deletedCategory = await this.categoryService.delete(Number(id));

            res.send(deletedCategory);
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
        this.router.post('/', this.create);
        this.router.put('/', this.update);
        this.router.delete('/', this.delete);
    }
}