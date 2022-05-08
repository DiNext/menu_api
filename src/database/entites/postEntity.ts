import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    author: string;

    @Column()
    content: string;

    @Column()
    date: string;
}