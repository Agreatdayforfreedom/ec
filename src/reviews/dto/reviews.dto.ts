import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDTO {
	@IsNumber()
	@Min(1)
	@Max(5)
	stars: number;

	@IsString()
	@IsOptional()
	text: string;
}

export class UpdateReviewDTO extends PartialType(CreateReviewDTO) {}
