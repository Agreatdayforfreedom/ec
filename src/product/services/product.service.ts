import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProductDTO } from '../dto/product.dto';
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

	async create(payload: CreateProductDTO) {
		return await this.prisma.product.create({
			data: {
				...payload,
				gems_price: payload.price * 100,
				rating: {
					create: { avg: 0 },
				},
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
				//TODO:
				// reviews: {
				// some: {
				// 	stars: {
				// 	},
				// },
				// },
			},
			orderBy: {
				price: query.or_price,
				// stars: query.or_stars,
			},
		};
	}
}
