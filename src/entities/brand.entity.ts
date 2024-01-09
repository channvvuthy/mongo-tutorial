import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    icon: string;

    @Column()
    description: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Product, product => product.brand)
    products: Product[];
}