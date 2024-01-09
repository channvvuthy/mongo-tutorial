import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { IsOptional } from "class-validator";

@Entity('units')
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    icon: string;

    @Column()
    @IsOptional()
    description: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Product, product => product.unit)
    products: Product[];
}