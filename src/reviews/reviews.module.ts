import { Module } from '@nestjs/common';
import { ReviewsController } from './controller/reviews.controller';
import { ReviewsService } from './services/reviews.service';
import { PrismaService } from '../prisma.service';

@Module({
	controllers: [ReviewsController],
	providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}
