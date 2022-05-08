import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    login: string;

    @Column()
    password: string;
}