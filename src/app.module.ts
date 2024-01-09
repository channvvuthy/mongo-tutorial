import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { UnitModule } from './modules/unit/unit.module';
import { BrandModule } from './modules/brand/brand.module';
import typeOrmConfig from './type-orm.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    CategoryModule,
    UnitModule,
    BrandModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
