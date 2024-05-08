import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from '../../user/dto/user.dto';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, pass: string) {
		const user = await this.userService.findOneByEmail(email);

		if (user?.password !== pass || !user) {
			throw new UnauthorizedException('Incorrect email or password');
		}
		const payload = {
			id: user.id,
			email: user.email,
			username: user.username,
			cart: user.cartId,
			role: user.role,
		};

		return {
			user: payload,
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signup(payload: CreateUserDTO) {
		let user = await this.userService.create(payload);

		return {
			user,
			access_token: await this.jwtService.signAsync(user),
		};
	}
}
