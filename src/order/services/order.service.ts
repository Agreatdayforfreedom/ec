import {
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Cart_Item, Order_Item } from '@prisma/client';

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async getOrders(userId: string) {
		return this.prisma.order.findMany({
			where: {
				userId,
			},
		});
	}

	async getOrder(orderId: string) {
		return this.prisma.order.findUnique({
			where: {
				id: orderId,
			},
			include: {
				order_items: {
					include: {
						product: true,
					},
				},
			},
		});
	}

	async createOrder(userId: string, cartId: string) {
		try {
			const cart_items = await this.prisma.cart_Item.findMany({
				where: {
					cartId,
				},
			});

			if (cart_items.length === 0)
				return new HttpException('The cart is empty!', 400);

			let items = cart_items.map(
				(i: Cart_Item) =>
					<Order_Item>{
						productId: i.productId,
						qty: i.qty,
						totalPrice: i.totalPrice,
					},
			);

			let [subtotal, totalItems] = items.reduce(
				(acc, c) => {
					acc[0] += c.totalPrice;
					acc[1] += c.qty;
					return acc;
				},
				[0, 0],
			);

			let purgeCart = this.prisma.cart_Item.deleteMany({
				where: {
					cartId,
				},
			});

			let order = this.prisma.order.create({
				data: {
					subtotal,
					totalItems,
					userId,
					order_items: {
						create: [...items],
					},
				},
			});

			const [order_res, _] = await this.prisma.$transaction([order, purgeCart]);
			return order_res;
		} catch (error) {
			return new HttpException('Internal Server Error', 500);
		}
	}
}
