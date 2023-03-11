import { Body, Controller, Get, Header, HttpException, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ErrorHandling } from 'src/config/error-handling';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @ApiTags('users')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post('create')
  async create(@Body() body: CreateUserDto){
    try {
      return this.usersService.createUser(body)
    } catch (error) {
      new ErrorHandling(error);
    } 
  }

  @ApiTags('users')
  @ApiOperation({ summary: 'Login an user' })
  @Get('login')
  async login(@Query() query){
    try {
      return this.usersService.login(query)
    } catch (error) {
      new ErrorHandling(error);
    } 
  }

  @ApiTags('users')
  @ApiOperation({ summary: 'Return all collectibles' })
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req){
    let { user } = req
    if(!user?.id){
      throw new HttpException("MISSING_INFO", 404);
    }
    try{
      return this.usersService.profile(user.id);
    } catch (error) {
      new ErrorHandling(error);
    } 
  }

}
