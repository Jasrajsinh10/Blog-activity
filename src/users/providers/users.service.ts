import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUserDto } from '../dtos/get-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const checkUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (checkUser) {
      throw new HttpException('email exsists', HttpStatus.BAD_REQUEST);
    } else {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      console.log(createUserDto);
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
      console.log(1);
      throw new HttpException(
        'Unauthorized to access',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public async login(loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.createToken(loginDto);
    await this.usersRepository.update({ email: loginDto.email }, { token });
    return token;
  }

  async findUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}
