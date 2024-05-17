import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductCreateDto{

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  imageUrl: string;
}