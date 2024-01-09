import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}