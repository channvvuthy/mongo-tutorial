import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  /**
   * Asynchronously transforms the input value based on the provided metadata.
   *
   * @param {any} value - The value to be transformed.
   * @param {ArgumentMetadata} metadata - The metadata for the value.
   * @returns {Promise<any>} - A promise that resolves to the transformed value.
   */
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const emailExists = await this.userService.isEmailExists(value.email);

    if (emailExists) {
      throw new BadRequestException('The provided email already exists.');
    }

    return value;
  }
}
