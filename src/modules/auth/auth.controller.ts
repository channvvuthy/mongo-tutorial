import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')

    /**
     * Sign in with the provided login credentials.
     *
     * @param {LoginDto} signInDto - The login credentials.
     * @return {Promise<any>} A promise that resolves with the result of the sign-in operation.
     */
    async signIn(@Body() signInDto: LoginDto): Promise<any> {
        try {
            return await this.authService.signIn(signInDto.email, signInDto.password);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }

}
