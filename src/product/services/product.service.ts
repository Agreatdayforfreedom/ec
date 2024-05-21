import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import { Prisma, Product } from '@prisma/client';
import { Query } from '../../types';

export interface ProductExtraKeys {
	totalReviews: number;
}

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async get({ id }: { id: string }): Promise<Product> {
		const product = await this.prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				metadata: true,
				saga: {
					include: {
						_count: {
							select: {
								products: true,
							},
						},
					},
				},
				rating: {
					include: {
						_count: {
							select: {
								reviews: true,
							},
						},
					},
				},
			},
		});
		if (!product) throw new HttpException('Product not found', 404);
		return product;
	}

	async getAll(query: Query) {
		let [products, count] = await this.prisma.$transaction([
			this.prisma.product.findMany({
				where: this.getAll_body(query).where,
				orderBy: this.getAll_body(query).orderBy,
			}),
			this.prisma.product.count({
				where: this.getAll_body(query).where,
			}),
		]);

		return {
			products,
			count,
		};
	}

	async create({ sagaId, ...payload }: CreateProductDTO) {
		return await this.prisma.product.create({
			data: {
				...payload,
				saga: {
					...(sagaId
						? {
								connect: {
									id: sagaId,
								},
							}
						: {}),
				},
				gems_price: payload.price * 100,
				rating: {
					create: { avg: 0 },
				},
			},
		});
	}

	async update(productId: string, payload: UpdateProductDTO) {
		return await this.prisma.product.update({
			where: {
				id: productId,
			},
			data: {
				...payload,
			},
		});
	}

	private getAll_body(query: Query): any {
		return {
			where: {
				title: {
					contains: query.search,
					mode: 'insensitive',
				},
				AND: [
					{
						price: {
							lte: query.max_price,
						},
					},
					{
						price: {
							gte: query.min_price,
						},
					},
				],
				rating: {
					...(query.stars > 0 && {
						AND: [
							{
								avg: {
									gte: query.stars - 1.0,
								},
							},
							{
								avg: {
									lte: query.stars,
								},
							},
						],
					}),
				},
			},
			orderBy: {
				price: query.or_price,
			},
		};
	}
}
