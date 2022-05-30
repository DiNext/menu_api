import { ProdsEntity } from "../database/entites/prodsEntity";
import { PostgresDataSource } from "../postgresDataSource";

export const prodsRepository = PostgresDataSource.getRepository(ProdsEntity);