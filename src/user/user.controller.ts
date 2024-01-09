import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UniqueEmailPipe } from './unique-email.pipe';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('/')
    @UsePipes(ValidationPipe)
    @UsePipes(UniqueEmailPipe)
    async create(@Body() createUser: CreateUserDto) {
        try {
            return await this.userService.create(createUser);
        } catch ({ message }: any) {
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }
}
