import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  async createUser(userData: CreateUserDto){
    let user = await this.userRepository.findOne({where: {name : userData.name}})
    if(user){
      throw new HttpException("USER_ALREADY_EXISTS", 409);
    }
    return await this.userRepository.save(user);
  }
}
