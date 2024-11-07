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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/:id')
  public getUsers(
    @Body() getUserDto: GetUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.getUser(getUserDto, id);
  }
}
