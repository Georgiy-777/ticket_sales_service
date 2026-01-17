import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type {
	SendOtpRequest,
	SendOtpResponse
} from '@teacinema/contracts/gen/ts/auth'

import { AuthService } from './auth.service'

@Controller()
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@GrpcMethod('AuthService', 'SendOtp')
	public sendOtp(data: SendOtpRequest): SendOtpResponse {
		console.log('🚀 ~ AuthController ~ sendOtp ~ data:', data)

		return { ok: true }
	}
}
