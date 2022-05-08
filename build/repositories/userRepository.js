"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userEntity_1 = require("../database/entites/userEntity");
const postgresDataSource_1 = require("../postgresDataSource");
exports.UserRepository = postgresDataSource_1.PostgresDataSource.getRepository(userEntity_1.UserEntity);
