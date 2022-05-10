import { CategoryEntity } from "../database/entites/categoryEntity";
import { PostgresDataSource } from "../postgresDataSource";

export const categoryRepository = PostgresDataSource.getRepository(CategoryEntity);