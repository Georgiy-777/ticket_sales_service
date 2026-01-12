import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { AppService } from './app.service'
import { HealthResponse } from './dto'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({
		summary: 'Get welcome message',
		description:
			'Returns a welcome message indicating that the Gateway Service is operational.'
	})
	@Get()
	public getHello() {
		return this.appService.getHello()
	}

	@ApiOperation({
		summary: 'Health Check',
		description:
			'Returns the health status of the Gateway Service along with a timestamp.'
	})
	@ApiOkResponse({
		type: HealthResponse,
		description: 'The service is healthy.',
		schema: {
			example: {
				status: 'ok',
				timestamp: '2024-01-01T00:00:00.000Z'
			}
		}
	})
	@Get('health')
	public health() {
		return this.appService.health()
	}
}
