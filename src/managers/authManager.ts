import { Request } from "express";
import jwt from "jsonwebtoken";

export class AuthManager {
    constructor() {

    }

    public checkReqAuth(req: Request) {
        const headerAuth = req.headers.authorization as string | undefined;

        if(headerAuth){
            const token = headerAuth.split(' ')[1];
            const validToken = this.validateToken(token);

            if(validToken === true){
                return true;
            }else {
                const error = new Error("Invalid token.");
                console.log(error);
                return false;
            }
        } 
        else {
            const error = new Error("Req without auth token.");
            console.log(error);
            return false;
        }  
    }

    private validateToken(token: string) {
        try{
            jwt.verify(token, process.env.SECRET_KEY || "abrakadabraaa");
            return true;
        } 
        catch(err) {
            console.log(err, ', when validating token.');
            return err;
        }
    }
}
