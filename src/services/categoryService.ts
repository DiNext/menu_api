import { CategoryEntity } from "../database/entites/categoryEntity";
import { categoryRepository } from "../repositories/categoryRepository";

export class CategoryService {
    private categoryRepository: typeof categoryRepository;

    constructor() {
        this.categoryRepository =  categoryRepository
    }

    public index = async () => {
        const categories = await this.categoryRepository.find({ relations: ['prods', 
                                                                            'children.prods', 'children.children.prods', 
                                                                            'children', "children.children", "children.children.children",
                                                                            'children.parent','children.children.parent',
                                                                            'parent', 'parent.prods', 'parent.parent.prods', 'parent.parent.parent.prods']});
        return categories;
    }

    public create = async (category: CategoryEntity) => {
        const newCategory = await this.categoryRepository.save(category);
        return newCategory;
    }

    public update = async (category: CategoryEntity, id: number) => {
        const updatedCategory = await this.categoryRepository.update(id, category);
        return updatedCategory;
    }

    public delete = async (id: number) => {
        const deletedCategory = await this.categoryRepository.delete(id);
        return deletedCategory;
    }
}