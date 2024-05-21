import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateSagaDTO } from '../dto/saga.dto';

@Injectable()
export class SagaService {
	constructor(private prisma: PrismaService) {}

	async getSaga(sagaId: string) {
		return await this.prisma.saga.findUnique({
			where: {
				id: sagaId,
			},
			include: {
				products: {
					orderBy: {
						order: 'asc',
					},
					include: {
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
				},
			},
		});
	}

	async createSaga(payload: CreateSagaDTO) {
		return await this.prisma.saga.create({
			data: {
				name: payload.name,
				description: payload.description,
			},
		});
	}
}
