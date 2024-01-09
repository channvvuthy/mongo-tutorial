import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constant';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configureSwagger } from './swagger/config.swagger';
/**
 * Initializes the application and starts the server.
 *
 * @return {Promise<void>} A promise that resolves once the server has started.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Use the configureSwagger function to set up Swagger
  configureSwagger(app);
  await app.listen(APP_PORT).then(() => console.log(`Server started on port ${APP_PORT}`));
}
bootstrap();
