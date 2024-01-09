import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/entities/unit.entity';
import { Repository } from 'typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';

@Injectable()
export class UnitService {

    constructor(@InjectRepository(Unit) private unitRepository: Repository<Unit>) {
    }

    /**
     * Creates a new Unit.
     *
     * @param {CreateUnitDto} createUser - The data for creating a Unit.
     * @return {Promise<Unit>} The created Unit.
     */
    async create(createUser: CreateUnitDto): Promise<Unit> {
        const Unit = this.unitRepository.create(createUser);
        return await this.unitRepository.save(Unit);
    }

    /**
     * Finds a Unit by its ID.
     *
     * @param {number} id - The ID of the Unit.
     * @return {Promise<Unit>} A promise that resolves to the found Unit.
     */
    async findOne(id: number): Promise<Unit> {
        const Unit = await this.unitRepository.findOne({ where: { id } });

        if (!Unit) {
            throw new NotFoundException(`Unit with ID ${id} not found`);
        }

        return Unit;
    }

    /**
     * Updates a Unit with the specified ID.
     *
     * @param {number} id - The ID of the Unit to update.
     * @param {CreateUnitDto} createUser - The data to update the Unit with.
     * @return {Promise<Unit>} - A promise that resolves to the updated Unit.
     */
    async updated(id: number, createUser: CreateUnitDto): Promise<Unit> {
        await this.unitRepository.update(id, createUser);
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
        await this.unitRepository.delete(id);
    }
}
