import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { ProdsEntity } from "./prodsEntity";

@Entity('Category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    public id:number;

    @ManyToOne(() => CategoryEntity, (parent: CategoryEntity) => parent.children)
    public parent: CategoryEntity;

    @OneToMany(() => CategoryEntity, (children: CategoryEntity) => children.parent)
    public children: CategoryEntity[];

    @Column()
    image: string;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => ProdsEntity, (prod: ProdsEntity) => prod.parent)
    public prods: ProdsEntity[];
}