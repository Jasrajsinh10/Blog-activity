// src/auth/auth.controller.ts
import { Controller, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('signup')
  // async signup(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.signup(createUserDto);
  // }

  @Get('token')
  async checkToken(@Request() req) {
    const access_token = req.headers.authorization?.split(' ')[1];
    const decoded = await this.authService.decodeToken(access_token);
    return decoded;
  }

  // @Post('login')
  // async login(@Body() body: { email: string; password: string }) {
  //   const user = await this.authService.validateUser(body.email, body.password);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   return this.authService.login(user);
  // }
}
