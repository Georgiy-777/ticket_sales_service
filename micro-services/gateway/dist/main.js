"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./core/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const logger = new common_1.Logger();
    app.enableCors({
        origin: config.getOrThrow('HTTP_CORS').split(','),
        credentials: true
    });
    const swaggerCofig = new swagger_1.DocumentBuilder()
        .setTitle('API Service')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerCofig);
    swagger_1.SwaggerModule.setup('/docs', app, swaggerDocument, {
        yamlDocumentUrl: '/openapi.yaml'
    });
    const port = config.getOrThrow('HTTP_PORT');
    const host = config.getOrThrow('HTTP_HOST');
    app.setGlobalPrefix('api');
    await app.listen(port);
    logger.log(`Gateway service is running : ${host}`);
}
bootstrap();
//# sourceMappingURL=main.js.map