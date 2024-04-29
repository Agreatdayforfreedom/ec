import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';

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
}
