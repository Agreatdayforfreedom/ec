import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
	constructor(private cartService: CartService) {}

	@Get()
	getCart(@Request() req) {
		return this.cartService.getCart(req.user.cart);
	}

	@Post('/add/:productId')
	addToCart(@Param('productId') productId: string, @Request() req) {
		return this.cartService.addToCart(productId, req.user.cart);
	}

	@Patch('/qty/:itemId')
	updateQty(@Param('itemId') itemId: string, @Body() { qty }: { qty: number }) {
		return this.cartService.updateQty(itemId, qty);
	}

	@Delete('/del/:itemId')
	removeItem(@Param('itemId') itemId: string) {
		return this.cartService.removeItem(itemId);
	}
}
