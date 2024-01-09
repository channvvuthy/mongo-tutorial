import { ApiQuery } from '@nestjs/swagger';

/**
 * Generates a MethodDecorator for paginating Swagger API queries.
 *
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of items per page.
 * @return {MethodDecorator} A decorator function to be used on Swagger API methods.
 */
export function PaginateSwagger(page: number = 1, limit: number = 10): MethodDecorator {
    return (
        target: any,
        key: string | symbol,
        descriptor: PropertyDescriptor,
    ) => {
        ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number', example: page })(
            target, key, descriptor
        );
        ApiQuery({ name: 'limit', type: Number, required: false, description: 'Items per page', example: limit })(
            target, key, descriptor
        );
    };
}
