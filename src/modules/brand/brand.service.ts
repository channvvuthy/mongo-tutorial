import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {

    constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>) {
    }

    /**
     * Creates a new Brand.
     *
     * @param {CreateBrandDto} createUser - The data for creating a Brand.
     * @return {Promise<Brand>} The created Brand.
     */
    async create(createUser: CreateBrandDto): Promise<Brand> {
        const Brand = this.brandRepository.create(createUser);
        return await this.brandRepository.save(Brand);
    }

    /**
     * Finds a Brand by its ID.
     *
     * @param {number} id - The ID of the Brand.
     * @return {Promise<Brand>} A promise that resolves to the found Brand.
     */
    async findOne(id: number): Promise<Brand> {
        const Brand = await this.brandRepository.findOne({ where: { id } });

        if (!Brand) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }

        return Brand;
    }

    /**
     * Updates a Brand with the specified ID.
     *
     * @param {number} id - The ID of the Brand to update.
     * @param {CreateBrandDto} createUser - The data to update the Brand with.
     * @return {Promise<Brand>} - A promise that resolves to the updated Brand.
     */
    async updated(id: number, createUser: CreateBrandDto): Promise<Brand> {
        await this.brandRepository.update(id, createUser);
        return this.findOne(id);
    }

    /**
     * Deletes a record with the given ID.
     *
     * @param {number} id - The ID of the record to delete.
     * @return {Promise<void>} A promise that resolves when the record is deleted.
     */
    async delete(id: number): Promise<void> {
        await this.findOne(id);
        await this.brandRepository.delete(id);
    }
}
