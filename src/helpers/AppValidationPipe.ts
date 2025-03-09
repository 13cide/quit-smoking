import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class AppValidationPipe implements PipeTransform {
  public async transform(value: string | object, metaData: ArgumentMetadata) {
    const { metatype } = metaData;

    if (typeof value === 'string' && metatype !== String && metatype !== Number) {
      throw new HttpException("String is not valid body", 400);
    }
    if (!metatype) throw new HttpException("aboba", 500);
    const object: object = plainToClass(metatype, value);

    if (typeof value === 'object') {
      const errors = await validate(object, { whitelist: true });
      if (errors.length) new HttpException("Validation has failed", 400);
    }

    return object;
  }
}