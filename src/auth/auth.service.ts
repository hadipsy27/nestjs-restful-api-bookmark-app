import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}

    signUp(){
        return {msg: "I have sign up"}
    }

    signin(){
        return {msg: "I have sign In"}
    }
}