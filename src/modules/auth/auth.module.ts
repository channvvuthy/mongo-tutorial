import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constant';
@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '5m' }, 
  }),],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }