import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Don't ignore expiration
      secretOrKey: 'secretKey', // Secret key to verify JWT
    });
  }

  // Validate the payload of the JWT
  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      userType: payload.userType,
    };
  }
}
