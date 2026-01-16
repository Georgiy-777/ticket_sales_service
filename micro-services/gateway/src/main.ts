import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './core/app.module'
import {
	getCorsConfig,
	getSwaggerConfig,
	getValidationPipeConfig
} from './core/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger()
	app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()))

	app.enableCors(getCorsConfig(config))

	SwaggerModule.setup('/docs', app, getSwaggerConfig(app), {
		yamlDocumentUrl: '/openapi.yaml'
	})

	const port = config.getOrThrow<number>('HTTP_PORT')
	const host = config.getOrThrow<string>('HTTP_HOST')
	app.setGlobalPrefix('api')
	await app.listen(port)
	logger.log(`Gateway service is running : ${host}`)
}
bootstrap()
