import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MetadataModule } from './metadata/metadata.module';
import { CartModule } from './cart/cart.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductModule, UserModule, AuthModule, MetadataModule, CartModule, ReviewsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
