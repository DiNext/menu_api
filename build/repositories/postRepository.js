"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const postEntity_1 = require("../database/entites/postEntity");
const postgresDataSource_1 = require("../postgresDataSource");
exports.postRepository = postgresDataSource_1.PostgresDataSource.getRepository(postEntity_1.PostEntity);
