import {
	type ValidationArguments,
	ValidatorConstraint,
	type ValidatorConstraintInterface
} from 'class-validator'
import { SendOtpRequest } from 'src/modules/auth/dto'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@ValidatorConstraint({ name: 'IdentifierValidator', async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
	public validate(value: string, args: ValidationArguments): boolean {
		const object = args.object as SendOtpRequest

		if (object.type === 'email') {
			const emailRegex =
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
			return emailRegex.test(value)
		} else if (object.type === 'phone') {
			const phoneRegex = /^\+?[1-9]\d{10,14}$/
			return phoneRegex.test(value)
		}
		return false
	}

	public defaultMessage(args: ValidationArguments): string {
		const object = args.object as SendOtpRequest

		if (object.type === 'email') {
			return 'Identifier must be a valid email address.'
		}
		if (object.type === 'phone') {
			return 'Identifier must be a valid phone number.'
		}

		return 'Invalid identifier type.'
	}
}
