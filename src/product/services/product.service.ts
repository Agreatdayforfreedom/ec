import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProductDTO } from '../dto/product.dto';
import { Product } from '@prisma/client';
import { Query } from '../../types';

export interface ProductExtraKeys {
	totalReviews: number;
	averageRate: number;
}

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async get({ id }: { id: string }): Promise<Product & ProductExtraKeys> {
		const product = await this.prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				metadata: true,
			},
		});
		let reviewsRate = await this.prisma.reviews.aggregate({
			where: {
				productId: product.id,
			},
			_sum: {
				stars: true,
			},
			_count: true,
		});
		if (!product) throw new HttpException('Product not found', 404);
		return {
			...product,
			totalReviews: reviewsRate._count,
			averageRate: reviewsRate._sum.stars / reviewsRate._count,
		};
	}

	async getAll(query: Query) {
		return await this.prisma.product.findMany({
			where: {
				title: {
					contains: query.search,
					mode: 'insensitive',
				},
			},
		});
	}

	async create(payload: CreateProductDTO) {
		return await this.prisma.product.create({
			data: payload,
		});
	}
}
