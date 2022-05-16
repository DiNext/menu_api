import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    parent: string;

    @Column()
    image: string;

    @Column({ unique: true })
    name: string;

}