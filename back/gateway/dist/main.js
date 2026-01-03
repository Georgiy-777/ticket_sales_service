"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./core/app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const logger = new common_1.Logger();
    app.enableCors({
        origin: config.getOrThrow('HTTP_CORS').split(','),
        credentials: true,
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('API Gateway')
        .setVersion('1.0.1')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/docs', app, swaggerDocument, {
        yamlDocumentUrl: '/openapi.yaml',
    });
    const host = config.getOrThrow('HTTP_HOST');
    const port = config.getOrThrow('HTTP_PORT');
    await app.listen(port ?? 3000);
    logger.log(`Gateway started ${host}`);
    logger.log(`Swagger started ${host}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map