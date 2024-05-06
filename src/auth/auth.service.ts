import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "crypto";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ){}

    async signUp(dto: AuthDto){
        // generate the password hash
        const hash = await argon.hash(dto.password);
        //save new user in db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
    
            return this.signToken(user.id, user.email);
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){ // P2002 -> is duplicate field
                    throw new ForbiddenException('Credentials taken')
                }
            }
        }
    }

    async signin(dto: AuthDto){
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // if user doesn't exist throw exception
        if (!user) {
            new ForbiddenException('Credentials incorrect!');
        }
        // compare password
        const pwMatches = await argon.verify(user.hash, dto.password);
        // if password incorect throw exception
        if(!pwMatches)  new ForbiddenException('Credentials incorrect!');

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email,
        }
        const secretKey = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secretKey,
        });

        return {
            access_token: token
        }
    }
    
    async getUsers(){
        const users = await this.prisma.user.findMany();
        console.info(users)

        return users.filter(user =>
            delete user.hash
        );
    }
    
}