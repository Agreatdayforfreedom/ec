import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateReviewDTO, UpdateReviewDTO } from '../dto/reviews.dto';

@Injectable()
export class ReviewsService {
	constructor(private prisma: PrismaService) {}

	async getReviews(productId: string) {
		return await this.prisma.reviews.findMany({
			where: {
				productId,
			},
		});
	}

	async create(payload: CreateReviewDTO, userId: string, productId: string) {
		if (payload.stars && (payload.stars < 0 || payload.stars > 5))
			return new HttpException('Wrong stars range', 400);

		const reviewed = await this.prisma.reviews.findFirst({
			where: {
				userId,
				productId,
			},
		});

		if (reviewed)
			return new HttpException('You have already rated this book', 400);
		console.log(payload);
		try {
			return await this.prisma.reviews.create({
				data: {
					...payload,
					userId,
					productId,
				},
			});
		} catch (error) {
			console.log(error);
			return new HttpException('Internal Server Error', 500);
		}
	}

	async update(payload: UpdateReviewDTO, reviewId: string, userId: string) {
		if (payload.stars && (payload.stars < 0 || payload.stars > 5))
			return new HttpException('Wrong stars range', 400);

		const review = await this.prisma.reviews.findUnique({
			where: {
				id: reviewId,
			},
		});

		if (!review) return new HttpException('Review not found', 404);

		if (review.userId !== userId) return new HttpException('Unauthorized', 401);

		try {
			return await this.prisma.reviews.update({
				where: {
					id: reviewId,
				},
				data: { ...payload },
			});
		} catch (error) {
			return new HttpException('Internal Server Error', 500);
		}
	}

	async delete(reviewId: string, userId: string) {
		const review = await this.prisma.reviews.findUnique({
			where: {
				id: reviewId,
			},
		});

		if (!review) return new HttpException('Review not found', 404);

		if (review.userId !== userId) return new HttpException('Unauthorized', 401);

		try {
			return await this.prisma.reviews.delete({
				where: { id: reviewId },
			});
		} catch (error) {
			return new HttpException('Internal Server Error', 500);
		}
	}
}