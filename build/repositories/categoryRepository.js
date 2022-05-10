"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepository = void 0;
const categoryEntity_1 = require("../database/entites/categoryEntity");
const postgresDataSource_1 = require("../postgresDataSource");
exports.categoryRepository = postgresDataSource_1.PostgresDataSource.getRepository(categoryEntity_1.CategoryEntity);
