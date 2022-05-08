import { Router, Response, Request } from "express";
import { PostEntity } from "../database/entites/postEntity";
import { PostService } from "../services/postService";
import jwt from "jsonwebtoken";

export class PostController {
    public router: Router;
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        try {
            const headerAuth = req.headers.authorization as string | undefined;
            if(headerAuth){
              const token = headerAuth.split(' ')[1];
              const validToken = this.validateToken(token)

              if(validToken){
                const posts = await this.postService.index();
        
                res.send(posts);
              } else {
                const error = new Error("User is not authorized");
                console.log(error)
                res.status(404).send('User is not authorized');
                return error;
              }
            }
          } 
          catch {
            const error = new Error("Error! Something went wrong.");
            console.log(error)
            res.status(404).send('Error occured.');
            return error;
          }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const headerAuth = req.headers.authorization as string | undefined;

            if(headerAuth){
              const token = headerAuth.split(' ')[1];
              const validToken = this.validateToken(token)

              if(validToken){
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
          } catch {
              const error = new Error("Error! Something went wrong.");
              console.log(error)
              res.status(404).send('Error occured.');
              return error;
          }
    }

    public update = async (req: Request, res: Response) => {
        try {
            const headerAuth = req.headers.authorization as string | undefined;
            if(headerAuth){
              const token = headerAuth.split(' ')[1];
              const validToken = this.validateToken(token)

              if(validToken){
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
          } 
          catch {
            const error = new Error("Error! Something went wrong.");
            console.log(error)
            res.status(404).send('Error occured.');
            return error;
          }
    }
    
    public delete = async (req: Request, res: Response) => {
        try {
            const headerAuth = req.headers.authorization as string | undefined;
            if(headerAuth){
              const token = headerAuth.split(' ')[1];
              const validToken = this.validateToken(token)

              if(validToken){
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
          } 
          catch {
            const error = new Error("Error! Something went wrong.");
            console.log(error)
            res.status(404).send('Error occured.');
            return error;
          }
    }

    private validateToken(token: string){
      return jwt.verify(token, process.env.SECRET_KEY || "abrakadabraaa" );
    }
    public routes(){
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/', this.update);
        this.router.delete('/', this.delete);
    }
}