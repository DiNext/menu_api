import { UserEntity } from "../database/entites/userEntity";
import { PostgresDataSource } from "../postgresDataSource";

export const UserRepository = PostgresDataSource.getRepository(UserEntity);