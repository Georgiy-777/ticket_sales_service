import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import type {
	AuthServiceClient,
	SendOtpRequest,
	SendOtpResponse
} from '@teacinema/contracts/gen/ts/auth'

@Injectable()
export class AuthClientGrpcService implements OnModuleInit {
	private authService: AuthServiceClient

	public constructor(
		@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.authService =
			this.client.getService<AuthServiceClient>('AuthService')
	}

	public sendOtp(request: SendOtpRequest): SendOtpResponse {
		return this.authService.sendOtp(request)
	}
}
