import { IsNumber, IsOptional, IsString } from "class-validator";


export class ProductUpdateDto{

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  imageUrl: string;
}