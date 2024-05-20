import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateReviewDTO, UpdateReviewDTO } from '../dto/reviews.dto';
import { Query } from '../../types';

@Injectable()
export class ReviewsService {
	constructor(private prisma: PrismaService) {}

	async getReviews(ratingId: string, query: Query) {
		const [reviews, count] = await this.prisma.$transaction([
			this.prisma.reviews.findMany({
				where: {
					rating: {
						id: ratingId,
					},
					...(query.stars ? { stars: query.stars } : {}),
				},
				include: {
					user: {
						select: {
							id: true,
							username: true,
						},
					},
				},
				orderBy: {
					created_at: (query.order_by as any) || 'desc',
				},
				skip: query.skip,
				take: query.take,
			}),
			this.prisma.reviews.count({
				where: {
					...(query.stars ? { stars: query.stars } : {}),
					ratingId,
				},
			}),
		]);

		return {
			count,
			reviews,
		};
	}

	async create(payload: CreateReviewDTO, userId: string, ratingId: string) {
		if (payload.stars && (payload.stars < 0 || payload.stars > 5))
			return new HttpException('Wrong stars range', 400);

		const rating = await this.prisma.rating.findUnique({
			where: {
				id: ratingId,
			},
		});

		if (!rating) return new HttpException('Rating not found', 404);

		const reviewed = await this.prisma.reviews.findFirst({
			where: {
				userId,
				ratingId,
			},
		});

		const avg = await this.prisma.reviews.findMany({
			where: {
				ratingId,
			},
			select: {
				stars: true,
			},
		});
		console.log(avg);
		// if (reviewed)
		// 	return new HttpException('You have already rated this book', 400);

		try {
			let update = this.prisma.rating.update({
				where: {
					id: ratingId,
				},
				data: {
					avg:
						avg.length > 0
							? (avg.reduce((acc, { stars }) => acc + stars, 0) +
									payload.stars) /
								(avg.length + 1)
							: payload.stars,
				},
			});
			let insert = this.prisma.reviews.create({
				data: {
					...payload,
					userId,
					ratingId,
				},
			});

			let [review, _] = await this.prisma.$transaction([insert, update]);

			return review;
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
