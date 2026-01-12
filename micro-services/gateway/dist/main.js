"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const logger = new common_1.Logger();
    app.enableCors({
        origin: config.getOrThrow('HTTP_CORS').split(','),
        credentials: true
    });
    const port = config.getOrThrow('HTTP_PORT');
    const host = config.getOrThrow('HTTP_HOST');
    app.setGlobalPrefix('api');
    await app.listen(port);
    logger.log(`Gateway service is running : ${host}`);
}
bootstrap();
//# sourceMappingURL=main.js.map