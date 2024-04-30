import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async get({ id }: { id: string }) {
		return await this.prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				metadata: true,
			},
		});
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
