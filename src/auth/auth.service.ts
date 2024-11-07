import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
// import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { userType } from '../users/enums/userType.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Hash password before saving a new user
  async signup(signupDto: SignupDto): Promise<User> {
    const { username, email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      userType: userType.USER, // Default user type
    });

    return await this.userRepository.save(user);
  }

  // Validate user's credentials (check password hash)
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  // Create a JWT token for the user
  async login(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      userType: user.userType,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }), // Token valid for 1 day
    };
  }
}
