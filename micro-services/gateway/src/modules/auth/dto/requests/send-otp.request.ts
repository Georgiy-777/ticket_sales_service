import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, Validate } from 'class-validator'
import { IdentifierValidator } from 'src/shared/validators/identifier.validator'

export class SendOtpRequest {
	@ApiProperty({
		example: '+380673262345',
		description: 'The identifier to which the OTP will be sent.'
	})
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	@IsString()
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	@Validate(IdentifierValidator)
	public identifier: string

	@ApiProperty({
		example: 'phone',
		enum: ['email', 'phone'],
		description: 'The type of identifier. Can be either "email" or "phone".'
	})
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	@IsEnum(['email', 'phone'])
	public type: 'email' | 'phone'
}
