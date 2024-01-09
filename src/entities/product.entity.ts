import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Unit } from "./unit.entity";
import { Brand } from "./brand.entity";

@Entity('product')
@Index('unique_product_name_brand_id', ['name', 'brand'], { unique: true })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @ManyToOne(() => Category, category => category.products)
    category: number;

    @ManyToOne(() => Unit, unit => unit.products)
    unit: number;
    
    @ManyToOne(() => Brand, brand=> brand.products)
    brand: number;

    @Column()
    isActive: boolean;

}