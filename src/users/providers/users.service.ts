import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const checkUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (checkUser) {
      throw new HttpException('email exsists', HttpStatus.BAD_REQUEST);
    } else {
      let newUser = this.usersRepository.create(createUserDto);
      newUser = await this.usersRepository.save(newUser);

      return newUser;
    }
  }
}
