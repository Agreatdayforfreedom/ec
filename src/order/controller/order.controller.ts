import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@Get('/')
	getOrders(@Req() req) {
		return this.orderService.getOrders(req.user.id);
	}

	@Get('/:orderId')
	getOrder(@Param('orderId') orderId: string) {
		return this.orderService.getOrder(orderId);
	}

	@Post('/create')
	createOrder(@Req() req) {
		return this.orderService.createOrder(req.user.id, req.user.cartId);
	}
}
