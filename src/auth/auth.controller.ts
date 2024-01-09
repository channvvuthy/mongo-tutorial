import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    /**
     * Sign in using the provided sign in DTO.
     *
     * @param {Record<string, any>} signInDto - The sign in DTO containing the email and password.
     * @return {Promise<any>} A promise that resolves to the result of the sign in operation.
     */
    async signIn(@Body() signInDto: Record<string, any>) {
        try {
            return await this.authService.signIn(signInDto.email, signInDto.password);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }

}
