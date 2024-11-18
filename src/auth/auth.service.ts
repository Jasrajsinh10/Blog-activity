// src/auth/auth.service.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/providers/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Remove password from the result
      return result;
    }
    return null;
  }

  async decodeToken(access_token: string) {
    const decoded = await this.jwtService.decode(access_token);
    return decoded;
  }

  async createToken(payload: JwtPayload) {
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }
}
