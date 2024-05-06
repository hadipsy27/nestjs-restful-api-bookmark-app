import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/guard';

@Controller('users')
export class UserController {
  constructor(){}

  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@Req() req: Request){
    console.log({
      user: req.user,
    });
    
    return req.user;
  }
}
