"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodsRepository = void 0;
const prodsEntity_1 = require("../database/entites/prodsEntity");
const postgresDataSource_1 = require("../postgresDataSource");
exports.prodsRepository = postgresDataSource_1.PostgresDataSource.getRepository(prodsEntity_1.ProdsEntity);
