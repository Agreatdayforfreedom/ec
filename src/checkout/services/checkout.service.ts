import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class CheckoutService {
	constructor(private prisma: PrismaService) {}

	async payWithGems(userId: string, orderId: string) {
		try {
			const order = await this.prisma.order.findUnique({
				where: {
					id: orderId,
				},
				include: {
					order_items: true,
				},
			});

			if (!order) return new HttpException('Order not found', 404);

			const user = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!user) return new HttpException('Unauthenticated', 401);
			if (user.gems < order.subtotal_gems)
				return new HttpException('Insufficient gems', 401);
			if (order.orderStatus === OrderStatus.PURCHASED)
				return new HttpException('This order has already been completed', 404);
			if (order.userId !== user.id)
				return new HttpException('Unautorized', 401);

			this.prisma.$transaction(async (self) => {
				await this.prisma.order.update({
					where: {
						id: orderId,
					},
					data: {
						orderStatus: OrderStatus.PURCHASED,
					},
				});
				await this.prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						gems: {
							decrement: order.subtotal_gems,
						},
					},
				});
				for (const item of order.order_items) {
					await self.product.update({
						where: {
							id: item.productId,
							stock: {
								gte: item.qty,
							},
						},
						data: {
							stock: {
								decrement: item.qty,
							},
						},
					});
				}
			});
		} catch (error) {}
	}
}
