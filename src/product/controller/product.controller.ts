import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDTO } from '../dto/product.dto';
import { Public } from '../../auth/public.decorator';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Public()
	@Get(':id')
	get(@Param() id: { id: string }) {
		console.log(id);
		return this.productService.get(id);
	}

	@Public()
	@Get()
	getAll() {
		return this.productService.getAll();
	}

	@Post()
	@Roles(Role.ADMIN)
	create(@Body() payload: CreateProductDTO) {
		return this.productService.create(payload);
	}
}
