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
exports.ProdsService = void 0;
const prodsRepository_1 = require("../repositories/prodsRepository");
class ProdsService {
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            const prods = yield this.prodsRepository.find();
            return prods;
        });
        this.findByParent = (parent) => __awaiter(this, void 0, void 0, function* () {
            const prods = yield this.prodsRepository.find({
                relations: ['parent'],
                where: {
                    parent: { id: parent }
                }
            });
            return prods;
        });
        this.create = (prod) => __awaiter(this, void 0, void 0, function* () {
            const { name, image, desc, price } = prod;
            const newProd = yield this.prodsRepository.save({ name: name, image: image, desc: desc, price: price, parent: prod.parent });
            return newProd;
        });
        this.update = (prod, id) => __awaiter(this, void 0, void 0, function* () {
            const updatedProd = yield this.prodsRepository.update(id, prod);
            return updatedProd;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedProd = yield this.prodsRepository.delete(id);
            return deletedProd;
        });
        this.prodsRepository = prodsRepository_1.prodsRepository;
    }
}
exports.ProdsService = ProdsService;
