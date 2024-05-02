import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
} from '@nestjs/common';
import { CreateReviewDTO, UpdateReviewDTO } from '../dto/reviews.dto';
import { ReviewsService } from '../services/reviews.service';
import { Public } from '../../auth/public.decorator';

@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}

	@Public()
	@Get('/:productId')
	getReviews(@Param('productId') productId: string) {
		return this.reviewsService.getReviews(productId);
	}

	@Post('/send/:productId')
	create(
		@Param('productId') productId: string,
		@Body() payload: CreateReviewDTO,
		@Request() req,
	) {
		return this.reviewsService.create(payload, req.user.id, productId);
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
