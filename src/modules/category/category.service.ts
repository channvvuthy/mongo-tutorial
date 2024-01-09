import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
    }

    /**
     * Creates a new category.
     *
     * @param {CreateCategoryDto} createUser - The data for creating a category.
     * @return {Promise<Category>} The created category.
     */
    async create(createUser: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createUser);
        return await this.categoryRepository.save(category);
    }

    /**
     * Finds a category by its ID.
     *
     * @param {number} id - The ID of the category.
     * @return {Promise<Category>} A promise that resolves to the found category.
     */
    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return category;
    }

    /**
     * Updates a category with the specified ID.
     *
     * @param {number} id - The ID of the category to update.
     * @param {CreateCategoryDto} createUser - The data to update the category with.
     * @return {Promise<Category>} - A promise that resolves to the updated category.
     */
    async updated(id: number, createUser: CreateCategoryDto): Promise<Category> {
        await this.categoryRepository.update(id, createUser);
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
        await this.categoryRepository.delete(id);
    }
}
