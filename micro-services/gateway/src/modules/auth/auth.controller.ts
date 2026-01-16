import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { SendOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	@ApiOperation({
		summary: 'Send OTP',
		description:
			'Sends a One-Time Password (OTP) to the specified identifier.'
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public sendOtp(@Body() dto: SendOtpRequest) {
		console.log(dto)
		return { success: true }
	}
}
