// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Configures Swagger for the given Nest application.
 *
 * @param {INestApplication} app - The Nest application instance.
 * @return {void} This function does not return a value.
 */
export function configureSwagger(app: INestApplication): void {
    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('Point of Sale')
        .setDescription('A point of sale (POS) is a place where a customer executes the payment for goods or services and where sales taxes may become payable.')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}
