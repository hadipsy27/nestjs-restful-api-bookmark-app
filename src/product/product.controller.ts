import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductUpdateDto } from './dto/product.update.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService){}
  
  @Post('create')
  createProduct(@Body() productCreateDto: ProductCreateDto, @Req() req: Request){
    return this.productService.createProduct(productCreateDto, req.user['id']);
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
