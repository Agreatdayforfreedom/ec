import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateMetadataDTO, UpdateMetadataDTO } from '../dto/metadata.dto';

@Injectable()
export class MetadataService {
	constructor(private prisma: PrismaService) {}

	async create(productId: string, payload: CreateMetadataDTO) {
		const existsProduct = await this.prisma.product.findUnique({
			where: {
				id: productId,
			},
			include: {
				metadata: true,
			},
		});
		if (!existsProduct) return new HttpException('Product not found', 404);

		if (existsProduct.metadata) {
			return new HttpException(
				'You cannot add more than 1 metadata table',
				400,
			);
		}
		try {
			return await this.prisma.metadata.create({
				data: {
					...payload,
					productId,
				},
			});
		} catch (error) {
			return new HttpException('Internal Server Error', 500);
		}
	}

	async update(metadataId: string, payload: UpdateMetadataDTO) {
		const exists = await this.prisma.metadata.findUnique({
			where: {
				id: metadataId,
			},
		});
		if (!exists) return new HttpException('Metadata not found', 404);

		return await this.prisma.metadata.update({
			where: {
				id: metadataId,
			},
			data: payload,
		});
	}
}
