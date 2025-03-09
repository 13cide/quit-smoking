import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppValidationPipe } from './helpers/AppValidationPipe';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new AppValidationPipe( ));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
