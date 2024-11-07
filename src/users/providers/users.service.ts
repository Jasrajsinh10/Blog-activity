import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUserDto } from '../dtos/get-user.dto';

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

  public async getUser(getUserDto: GetUserDto, id: number) {
    const checkusertype = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (checkusertype.userType == 'Admin') {
      const user = this.usersRepository.findOne({
        where: { id: getUserDto.id },
      });
      return user;
    } else {
      throw new HttpException(
        'Unauthorized to access',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}
