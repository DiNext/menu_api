import { UserEntity } from "../database/entites/userEntity";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
    private userRepository: typeof UserRepository;

    constructor() {
        this.userRepository =  UserRepository;
    }

    public getUser = async (user: UserEntity) => {
        try {
            const usr = await this.userRepository.findOne({where:{login: user.login}}); 
            return usr;
          } 
          catch(err) {
            console.error(err, ', when getting user from db.');
          }
    }

    public create = async (user: UserEntity) => {
        try {
            const newUser =  await this.userRepository.save(user);                                                               
            return newUser; 
          } 
          catch(err) {
            console.error(err, ', when creating user in db.');
          }
    }
}