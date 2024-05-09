import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async get({ id }: { id: string }) {
		const product = await this.prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				metadata: true,
				_count: {
					select: { reviews: true },
				},
				reviews: {
					include: {
						user: {
							select: {
								id: true,
								username: true,
							},
						},
					},
					take: 5,
				},
			},
		});
		if (!product) return new HttpException('Product not found', 404);

		return product;
	}

	async getAll() {
		return await this.prisma.product.findMany();
	}

	async create(payload: CreateProductDTO) {
		return await this.prisma.product.create({
			data: payload,
		});
	}
}
