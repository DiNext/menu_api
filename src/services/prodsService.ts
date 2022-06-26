import { ProdsEntity } from "../database/entites/prodsEntity";
import { CategoryEntity } from "../database/entites/categoryEntity";
import { prodsRepository } from "../repositories/prodsRepository";

export class ProdsService {
    private prodsRepository: typeof prodsRepository;

    constructor() {
        this.prodsRepository =  prodsRepository
    }

    public index = async () => {
        const prods = await this.prodsRepository.find({relations:['parent']});
        return prods;
    }
    
    public findByParent = async (parent: number) => {
        const prods = await this.prodsRepository.find({
            relations:['parent'],
            where:{
                parent: {id: parent}
            }
        });
        return prods;
    }

    public create = async (prod: ProdsEntity) => {
        const {name, image, desc, price} = prod;

        const newProd = await this.prodsRepository.save({name: name, image: image, desc: desc, price: price, parent: prod.parent as CategoryEntity});
        return newProd;
    }

    public update = async (prod: ProdsEntity, id: number) => {
        const updatedProd = await this.prodsRepository.update(id, prod);
        return updatedProd;
    }

    public delete = async (id: number) => {
        const deletedProd = await this.prodsRepository.delete(id);
        return deletedProd;
    }
}