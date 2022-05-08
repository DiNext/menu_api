import { PostEntity } from "../database/entites/postEntity";
import { PostgresDataSource } from "../postgresDataSource";

export const postRepository = PostgresDataSource.getRepository(PostEntity);