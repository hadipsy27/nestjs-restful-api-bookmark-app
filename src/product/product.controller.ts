import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductUpdateDto } from './dto/product.update.dto';

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

  @Put('update/:productId')
  updateProduct(@Param('productId', ParseIntPipe) productId: number, @Body() productUpdateDto: ProductUpdateDto){
    return this.productService.updateProduct(productId, productUpdateDto);
  }

  @Delete("delete/:productId")
  deleteProduct(@Param('productId', ParseIntPipe) productId: number){
    return this.productService.deleteProduct(productId);
  }
}
