import { Router, Response, Request } from "express";
import { PostEntity } from "../database/entites/postEntity";
import { PostService } from "../services/postService";
import { AuthManager } from "../managers/authManager";

export class PostController {
    public router: Router;
    private postService: PostService;
    private authManager: AuthManager;

    constructor() {
        this.authManager = new AuthManager();
        this.postService = new PostService();
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        try {
          const successAuth = this.authManager.checkReqAuth(req) as boolean;

          if(successAuth) {
              const posts = await this.postService.index();
              res.send(posts);
          } else {
              const error = new Error("User is not authorized");
              console.log(error)
              res.status(404).send('User is not authorized');
              return error;
          }
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
              const post = req['body'] as PostEntity;
              post.date = new Date().toLocaleString('ru').toString();
              const newPost = await this.postService.create(post);
              
              res.send(newPost);
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
              const post = req['body'] as PostEntity;
              const id = req['query']['id'];
              const updatedPost = await this.postService.update(post, Number(id))

              res.send(updatedPost);
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
            const deletedPost = await this.postService.delete(Number(id));

            res.send(deletedPost);
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