import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDTO } from '../dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  get(@Param() id: { id: string }) {
    console.log(id);
    return this.productService.get(id);
  }

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productService.create(payload);
  }
}
