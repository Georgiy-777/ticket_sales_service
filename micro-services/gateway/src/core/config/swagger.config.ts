import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'

export function getSwaggerConfig(app: INestApplication<any>): OpenAPIObject {
	const swaggerCofig = new DocumentBuilder()
		.setTitle('API Service')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build()

	return SwaggerModule.createDocument(app, swaggerCofig)
}
