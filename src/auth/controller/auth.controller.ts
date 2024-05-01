import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateUserDTO } from '../../user/dto/user.dto';
import { AuthService } from '../services/auth.service';
import { Public } from '../public.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('signup')
	signup(@Body() payload: CreateUserDTO) {
		return this.authService.signup(payload);
	}

	@Public()
	@Post('signin')
	signin(@Body() { email, password }: Record<string, string>) {
		return this.authService.signIn(email, password);
	}

	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
