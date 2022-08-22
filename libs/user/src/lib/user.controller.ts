import { Body, Controller, Get, Post, Request, HttpStatus, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { AuthService } from '@jua/auth';
import { RegisterDTO } from '../dto/register.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any,  @Res() res: Response) {
    if (!req.user.isActive) return res.status(HttpStatus.PRECONDITION_FAILED).json({ 
      message: 'Cannot login into the platform, talk to our support team support@jua.io' 
    });
    const token = await this.authService.loginWithCredentials(req.user);
    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      access_token: token,
      user: req.user
    });
  }

  @Post('new')
  async createUser(@Body() params: RegisterDTO, @Res() res: Response) {
    const { phoneNumber, email, username } = params;
    // Validate if user already exists
    const isUserP = await this.userService.findOneByPhoneNumber(phoneNumber);
    if (isUserP) return res.status(HttpStatus.CONFLICT).json({'message': 'User already exists'});
    const isUserE = await this.userService.findOneByEmail(email);
    if (isUserE) return res.status(HttpStatus.CONFLICT).json({'message': 'User already exists'});
    const isUserU = await this.userService.findOneByUsername(username);
    if (isUserU) return res.status(HttpStatus.CONFLICT).json({'message': 'User already exists'});

    const user = await this.userService.create(params);
    if(!user) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({'message': 'User could not be created'});
    return res.status(HttpStatus.OK).json({'message': 'User created successfully'});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllUsers(@Body() params: Prisma.UserFindManyArgs) {
    return this.userService.findAll(params);
  }
}
