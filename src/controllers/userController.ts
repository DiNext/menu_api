import { Router, Response, Request } from "express";
import { UserEntity } from "../database/entites/userEntity";
import { UserService } from "../services/userService";
import jwt from "jsonwebtoken";
const bcrypt = require('bcrypt');

export class AuthController {
    public router: Router;
    private userService: UserService;
    private salt;

    constructor() { 
        this.userService = new UserService();
        this.salt = bcrypt.genSaltSync(10);
        this.router = Router();
        this.routes();
    }

    public login = async (req: Request, res: Response) => {
        try{
            const user = req['body'] as UserEntity;
 
            if(user.login == undefined || user.password == undefined){
                const error = new Error("Incorrect req");
                res.status(404).send("Incorrect req");
                return error;
            }

            const existingUser = await this.userService.getUser(user);

            if(!existingUser){
                const error = new Error("No such user, please check details");
                res.status(404).send("No such user, please check details");
                return error;
            } 

            const correctPass = await bcrypt.compare(user.password, existingUser.password);

            if(correctPass){
                const token = this.generateJWT(existingUser);

                res.status(200).send({
                    success: true,
                    data:{
                        userId: existingUser.id,
                        login: existingUser.login,
                        token: token
                    }
                });
            } else{
                const error = new Error("Wrong password, please check details");
                res.status(404).send("Wrong password, please check details");
                return error;
            }
        } catch(err) {
            console.log(err, ', when login.')
            res.status(404).send('Something went wrong');
            return err;
        }
        
    }    

    public signUp = async (req: Request, res: Response) => {
        try{
            const newUser = req['body'] as UserEntity;

            const existingUser = await this.userService.getUser(newUser);

            if(existingUser){
                const error = new Error("User already exists");
                res.status(404).send('User already exists');
                return error;
            }

            const passwordToSave = await bcrypt.hash(newUser.password, this.salt);
            newUser.password = passwordToSave; 
            await this.userService.create(newUser);

            const token = this.generateJWT(newUser);
            res.status(201).json({success: true,
                                  data: { userId: newUser.id, login: newUser.login, token: token }});

        } catch(err) {
            console.log(err, ', when signup.')
            res.status(404).send('Something went wrong');
            return err;
        }
    }

    private generateJWT(user: UserEntity) {
        return jwt.sign({userId: user.id, login: user.login}, 
                process.env.SECRET_KEY || "abrakadabraaa", 
                {expiresIn: "24h"});
    }

    public routes(){
        this.router.post('/login', this.login);
        this.router.post('/signup', this.signUp);
    }
}