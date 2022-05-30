import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { CategoryEntity } from "./categoryEntity";

@Entity('Prods')
export class ProdsEntity {
    @PrimaryGeneratedColumn()
    public id:number;

    @ManyToOne(() => CategoryEntity, (parent: CategoryEntity) => parent.prods)
    public parent: CategoryEntity

    @Column()
    image: string;

    @Column({ unique: true })
    name: string;

    @Column()
    price: number;

    @Column()
    desc: string;
}