import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';
import { GetUserDto } from './dtos/get-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  public login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Get('/:id')
  public getUsers(
    @Body() getUserDto: GetUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.getUser(getUserDto, id);
  }
}
