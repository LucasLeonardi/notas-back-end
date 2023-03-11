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
    userData.password = await this.authService.encryptPassword(userData.password);
    let registerUser = await this.userRepository.save(userData);
    delete registerUser.password;
    return registerUser;
  }

  async login(userData: CreateUserDto){
    let user = await this.userRepository.findOne(
      {
        where: {name : userData.name},
      }
    );
    if(!user){
      throw new HttpException("USER_NOT_FOUND", 404);
    } 
    if(await this.authService.validadePassword(userData.password, user.password)){
      throw new HttpException("WRONG_PASSWORD", 401);
    }
    let JwtToken = await this.authService.login(user);
    delete user.password;
    return {
      ...user,
      token: JwtToken.access_token
    };
  }

  async profile(userId: string){
    let user = await this.userRepository.findOne(
      {
        where: {id : userId},
        select: ["name", "id"]
      }
    );
    if(!user){
      throw new HttpException("USER_NOT_FOUND", 404);
    };
    return user;
  }
}
