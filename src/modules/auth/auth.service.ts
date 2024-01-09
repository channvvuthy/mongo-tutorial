import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    /**
     * Asynchronously signs in a user.
     *
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @return {Promise<any>} - A promise that resolves to an access token.
     */
    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        await this.userService.isPasswordValid(password, user.password);
        
        const payload = {
            email: user.email,
            sub: user.id,
            name: user.email
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async isTokenValid(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
            return true;
        } catch (error) {
            console.log({ error })
            return false;
        }
    }
}
