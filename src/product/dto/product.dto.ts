import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly image: string;

  @IsInt()
  @Min(1)
  readonly stock: number;

  @IsInt()
  @Min(1)
  @Max(999)
  readonly price: number;
}
