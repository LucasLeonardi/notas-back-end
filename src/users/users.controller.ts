import { Body, Controller, Get, Post } from '@nestjs/common';
import { ErrorHandling } from 'src/config/error-handling';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post('create')
  async create(@Body() body: CreateUserDto){
    try {
      return this.usersService.createUser(body)
    } catch (error) {
      new ErrorHandling(error);
    } 
  }

  @Get('create')
  async login(@Body() body: CreateUserDto){
    try {
      return this.usersService.createUser(body)
    } catch (error) {
      new ErrorHandling(error);
    } 
  }

}
