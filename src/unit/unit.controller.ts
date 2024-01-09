import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from 'src/entities/unit.entity';

@Controller('units')
export class UnitController {
    constructor(
        private readonly UnitService: UnitService
    ) { }

    @Post('/')
    @UsePipes(ValidationPipe)
    /**
     * Creates a new unit.
     *
     * @param {CreateUnitDto} createUser - The information of the unit to create.
     * @return {Promise<Unit>} The newly created unit.
     */
    async create(@Body() createUser: CreateUnitDto): Promise<Unit> {
        try {
            return await this.UnitService.create(createUser);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id/detail')
    /**
     * Retrieves the details of a unit by its ID.
     *
     * @param {number} id - The ID of the unit.
     * @return {Promise<Unit>} A Promise that resolves to the unit details.
     */
    async details(@Param('id') id: number): Promise<Unit> {
        try {
            return await this.UnitService.findOne(id);
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
            return await this.UnitService.delete(id);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id/update')
    /**
     * Updates a unit with the specified ID.
     *
     * @param {number} id - The ID of the unit to update.
     * @param {CreateUnitDto} createUser - The data to update the unit with.
     * @return {Promise<Unit>} A promise that resolves to the updated unit.
     */
    async update(@Param('id') id: number, @Body() createUser: CreateUnitDto): Promise<Unit> {
        try {
            return await this.UnitService.updated(id, createUser);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }
}
