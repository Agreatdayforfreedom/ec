import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Request,
} from '@nestjs/common';
import { CreateReviewDTO, UpdateReviewDTO } from '../dto/reviews.dto';
import { ReviewsService } from '../services/reviews.service';
import { Public } from '../../auth/public.decorator';
import { Query as IQuery } from '../../types';
import { QueryPipeTransform } from '../../pipes/query.pipe';

@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}

	@Public()
	@Get('/:ratingId')
	getReviews(
		@Param('ratingId') ratingId: string,
		@Query(QueryPipeTransform) query: IQuery,
	) {
		return this.reviewsService.getReviews(ratingId, query);
	}

	@Post('/send/:ratingId')
	create(
		@Param('ratingId') ratingId: string,
		@Body() payload: CreateReviewDTO,
		@Request() req,
	) {
		return this.reviewsService.create(payload, req.user.id, ratingId);
	}

	@Patch('/update/:reviewId')
	update(
		@Param('reviewId') reviewId: string,
		@Body() payload: UpdateReviewDTO,
		@Request() req,
	) {
		return this.reviewsService.update(payload, reviewId, req.user.id);
	}

	@Delete('/del/:reviewId')
	delete(@Param('reviewId') reviewId: string, @Request() req) {
		return this.reviewsService.delete(reviewId, req.user.id);
	}
}
