import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const clientPath = path.join(__dirname, '..', '..', 'client', 'build');

  // Serve static files from the 'public' directory
  app.useStaticAssets(clientPath);

  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}

bootstrap();
