import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { ClientsModule } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'AUTH_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: 0,
					options: {
							package: 'auth.v1',
							protoPath: 'node_modules/@teacinema/contracts/proto/auth.proto',
			            url: 'localhost:50051',
					  }
				})
			}
		])
	]
	controllers: [AuthController],
	providers: []
})
export class AuthModule {}
