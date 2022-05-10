"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
class CategoryService {
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.find();
            return categories;
        });
        this.create = (category) => __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield this.categoryRepository.save(category);
            return newCategory;
        });
        this.update = (category, id) => __awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield this.categoryRepository.update(id, category);
            return updatedCategory;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield this.categoryRepository.delete(id);
            return deletedCategory;
        });
        this.categoryRepository = categoryRepository_1.categoryRepository;
    }
}
exports.CategoryService = CategoryService;
