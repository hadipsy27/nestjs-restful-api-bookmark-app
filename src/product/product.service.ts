import { Body, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { error, log } from 'console';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService){}

  async createProduct(productCreateDto: ProductCreateDto, userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: {id: userId}
    });
    
    if(!user)
      throw new Error("user not found!")

    console.info({
      user: user
    })
    
    const data = await this.prismaService.product.create({
      data: {
        ...productCreateDto,
        user: {
          connect: { id: user.id },
        },
      },
    });
    
    console.info({
      data: data
    })

    return data;

  }

  async getProductByUser(id: number){
    const productUser = await this.prismaService.product.findMany({
      where: {
        userId: id
      }
    })
    console.info({
      data: productUser
    })

    const result = {
      data: productUser,
      message: "Success Get All Product User"
    }

    return result;
  }

}
