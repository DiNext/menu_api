import { DataSource } from "typeorm"

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "blog",
    database: "postgres",
    entities: ["build/database/entites/**/*.js"],
    synchronize: true,
    name: "blog"
})