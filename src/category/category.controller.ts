import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'src/entities/category.entity';

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post('/')
    @UsePipes(ValidationPipe)
    /**
     * Creates a new category.
     *
     * @param {CreateCategoryDto} createCategory - The information of the category to create.
     * @return {Promise<Category>} The newly created category.
     */
    async create(@Body() createCategory: CreateCategoryDto): Promise<Category> {
        try {
            return await this.categoryService.create(createCategory);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id/detail')
    /**
     * Retrieves the details of a category by its ID.
     *
     * @param {number} id - The ID of the category.
     * @return {Promise<Category>} A Promise that resolves to the category details.
     */
    async details(@Param('id') id: number): Promise<Category> {
        try {
            return await this.categoryService.findOne(id);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id/delete')
    /**
     * Deletes a record with the specified ID.
     *
     * @param {number} id - The ID of the record to delete.
     * @return {Promise<void>} Promise that resolves when the record is deleted.
     */
    async delete(@Param('id') id: number): Promise<void> {
        try {
            return await this.categoryService.delete(id);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id/update')
    /**
     * Updates a category with the specified ID.
     *
     * @param {number} id - The ID of the category to update.
     * @param {CreateCategoryDto} createCategory - The data to update the category with.
     * @return {Promise<Category>} A promise that resolves to the updated category.
     */
    async update(@Param('id') id: number, @Body() createCategory: CreateCategoryDto): Promise<Category> {
        try {
            return await this.categoryService.updated(id, createCategory);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }
}
