import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(){}

  @Get("me")
  getMe(@GetUser() user: User){
    console.log({
      user: user,
    });
    
    return user;
  }
}
