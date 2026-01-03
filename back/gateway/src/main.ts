import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './core/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger();
  app.enableCors({
    origin: config.getOrThrow<string>('HTTP_CORS').split(','),
    credentials: true,
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Gateway')
    .setVersion('1.0.1')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, swaggerDocument, {
    yamlDocumentUrl: '/openapi.yaml',
  });
  const host = config.getOrThrow<string>('HTTP_HOST');
  const port = config.getOrThrow<number>('HTTP_PORT');

  await app.listen(port ?? 3000);

  logger.log(`Gateway started ${host}`);
  logger.log(`Swagger started ${host}/docs`);
}
bootstrap();
