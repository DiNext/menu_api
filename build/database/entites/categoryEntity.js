"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CategoryEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const prodsEntity_1 = require("./prodsEntity");
let CategoryEntity = CategoryEntity_1 = class CategoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity_1, (parent) => parent.children),
    __metadata("design:type", CategoryEntity)
], CategoryEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CategoryEntity_1, (children) => children.parent),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prodsEntity_1.ProdsEntity, (prod) => prod.parent),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "prods", void 0);
CategoryEntity = CategoryEntity_1 = __decorate([
    (0, typeorm_1.Entity)('Category')
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
