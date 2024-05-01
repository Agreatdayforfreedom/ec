import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CartService } from './services/cart.service';
import { PrismaService } from '../prisma.service';

@Module({
	controllers: [CartController],
	providers: [CartService, PrismaService],
})
export class CartModule {}
