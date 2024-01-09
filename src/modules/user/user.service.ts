import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorMessages } from 'src/utils/error-message';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    /**
     * Creates a new user.
     *
     * @param {CreateUserDto} createUserDto - The user data to create.
     * @return {Promise<User>} The created user.
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        });

        return await this.userRepository.save(user);
    }


    /**
     * Finds a user by their email.
     *
     * @param {string} email - The email of the user to find.
     * @return {Promise<User>} The user found by email.
     */
    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error(ErrorMessages.INVALID_CREDENTIAL);
        }
        return user;
    }

    /**
     * Checks if the given email exists in the user repository.
     *
     * @param {string} email - The email to check.
     * @return {Promise<boolean>} A boolean indicating if the email exists.
     */
    async isEmailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user ? true : false
    }

    /**
     * Checks if the provided password is valid.
     *
     * @param {string} password - The password to check.
     * @param {string} userPassword - The user's password to compare against.
     * @returns {Promise<boolean>} - Returns a Promise that resolves to a boolean indicating whether the password is valid.
     */
    async isPasswordValid(password: string, userPassword: string): Promise<boolean> {
        const isPasswordValid = await bcrypt.compare(password, userPassword);

        if (!isPasswordValid) {
            throw new Error(ErrorMessages.INVALID_CREDENTIAL);
        }
        return isPasswordValid;
    }


}


