import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ){}

  async createUser(userData: CreateUserDto){
    let user = await this.userRepository.findOne({where: {name : userData.name}});
    if(user){
      throw new HttpException("USER_ALREADY_EXISTS", 409);
    }
    return await this.userRepository.save(user);
    
  }

  async login(userData: CreateUserDto){
    let user = await this.userRepository.findOne({where: {name : userData.name}});
    if(!user){
      throw new HttpException("USER_NOT_FOUND", 404);
    } 
    if(user.password != userData.password){
      throw new HttpException("WRONG_PASSWORD", 401);
    }
    let JwtToken = await this.authService.login(user)
    return {
      ...user,
      token: JwtToken
    }
  }
}
