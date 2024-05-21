import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Role } from '@prisma/client';

import { ProductService } from '../services/product.service';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import { Public } from '../../auth/public.decorator';
import { Roles } from '../../auth/roles.decorator';
import { QueryPipeTransform } from '../../pipes/query.pipe';
import { Query as IQuery } from '../../types';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Public()
	@Get(':id')
	get(@Param() id: { id: string }) {
		return this.productService.get(id);
	}

	@Public()
	@Get()
	getAll(@Query(QueryPipeTransform) query: IQuery) {
		return this.productService.getAll(query);
	}

	@Post()
	@Roles(Role.ADMIN)
	create(@Body() payload: CreateProductDTO) {
		return this.productService.create(payload);
	}

	@Put(':productId')
	@Roles(Role.ADMIN)
	update(
		@Param('productId') productId: string,
		@Body() payload: UpdateProductDTO,
	) {
		return this.productService.update(productId, payload);
	}
}
