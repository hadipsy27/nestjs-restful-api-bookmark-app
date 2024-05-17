import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.create.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService){}


  @Post('create/:userId')
  createProduct(@Body() productCreateDto: ProductCreateDto, @Param('userId', ParseIntPipe) userId: number){

    return this.productService.createProduct(productCreateDto, userId);
  }

  @Get('user/:userId')
  userProduct(@Param('userId', ParseIntPipe) userId: number){
    return this.productService.getProductByUser(userId);
  }
}
