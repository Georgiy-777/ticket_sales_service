import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	public getHello() {
		return {
			message: 'Gateway Service is up and running!'
		}
	}

	public health() {
		return {
			status: 'ok',
			timestamp: new Date().toISOString()
		}
	}
}
