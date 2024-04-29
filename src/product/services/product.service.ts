import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  get({ id }: { id: string }) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  getAll() {
    return this.prisma.product.findMany();
  }
}
