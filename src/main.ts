import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(APP_PORT).then(() => console.log(`Server started on port ${APP_PORT}`));
}
bootstrap();
