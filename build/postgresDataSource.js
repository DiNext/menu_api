"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.PostgresDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "blog",
    password: "blog",
    database: "blogdb",
    entities: ["build/database/entites/**/*.js"],
    synchronize: true,
    name: "blog"
});
