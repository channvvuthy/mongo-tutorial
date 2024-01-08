import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorMessages } from 'src/utils/error-message';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }
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
