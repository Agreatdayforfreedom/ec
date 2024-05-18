import { Controller, Param, Post, Req } from '@nestjs/common';
import { CheckoutService } from '../services/checkout.service';

@Controller('checkout')
export class CheckoutController {
	constructor(private checkoutService: CheckoutService) {}

	@Post('gems/:orderId')
	payWithGems(@Param('orderId') orderId: string, @Req() req) {
		return this.checkoutService.payWithGems(req.user.id, orderId);
	}
}
