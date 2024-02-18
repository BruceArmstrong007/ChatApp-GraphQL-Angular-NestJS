import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    credentials: true,
    origin: [config.get('CLIENT_URI1'), config.get('CLIENT_URI2')],
  });
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
