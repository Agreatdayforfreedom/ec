import { Cover } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class CreateMetadataDTO {
	@IsNumber()
	@Min(1)
	pages: number;

	@IsString()
	publisher: string;

	@IsString()
	language?: string;

	@IsEnum(Cover)
	cover: Cover;

	@IsString()
	year?: Date;

	@IsString()
	isbn: string;
}

export class UpdateMetadataDTO extends PartialType(CreateMetadataDTO) {}
