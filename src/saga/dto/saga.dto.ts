import { IsString, MaxLength } from 'class-validator';

export class CreateSagaDTO {
	@IsString()
	@MaxLength(128)
	name: string;

	@IsString()
	@MaxLength(255)
	description: string;
}
