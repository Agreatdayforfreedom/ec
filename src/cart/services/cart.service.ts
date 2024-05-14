import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CartService {
	constructor(private prisma: PrismaService) {}

	async getCart(id: string) {
		return await this.prisma.cart.findUnique({
			where: {
				id,
			},
			include: {
				items: {
					include: {
						product: true,
					},
				},
				_count: { select: { items: true } },
			},
		});
	}

	async addToCart(productId: string, cartId: string) {
		const product = await this.prisma.product.findUnique({
			where: { id: productId },
		});

		if (!product) return new HttpException('Product not found', 404);
		if (product.stock < 1) return new HttpException('There is not stock!', 400);

		const cart = await this.getCart(cartId);

		if (!cart) return new HttpException('Cart not found', 404);

		const item = await this.prisma.cart_Item.findFirst({
			where: {
				cartId,
				productId,
			},
		});

		if (!item) {
			return await this.prisma.cart_Item.create({
				data: {
					cartId,
					productId,
					totalPrice: product.price,
				},
			});
		} else {
			item.qty++;
			item.totalPrice += product.price;
			return await this.prisma.cart_Item.update({
				where: {
					id: item.id,
				},
				data: {
					...item,
				},
			});
		}
	}

	async updateQty(itemId: string, qty: number) {
		const item = await this.prisma.cart_Item.findUnique({
			where: {
				id: itemId,
			},
			include: {
				product: true,
			},
		});

		if (!item) return new HttpException('Item not found', 404);
		if (qty > item.product.stock)
			return new HttpException(
				{
					id: item.id,
					message: `You can select at most ${item.product.stock} items`,
				},
				400,
			);

		if (qty <= 0) {
			return this.removeItem(item.id);
		}
		// let totalPrice: number = item.totalPrice;
		// if (qty < 0) {
		// 	totalPrice -= item.product.price * Math.abs(qty);
		// } else if (qty > 0) {
		// 	totalPrice += item.product.price * qty;
		// } else {
		// }

		return this.prisma.cart_Item.update({
			where: {
				id: itemId,
			},
			data: {
				qty,
				totalPrice: item.product.price * qty,
			},
		});
	}

	async removeItem(itemId: string) {
		const item = await this.prisma.cart_Item.findUnique({
			where: {
				id: itemId,
			},
		});

		if (!item) return new HttpException('Item not found', 404);

		return this.prisma.cart_Item.delete({
			where: { id: itemId },
		});
	}
}
