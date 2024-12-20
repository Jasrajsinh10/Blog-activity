import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { userType } from '../enums/userType.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(24)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  @IsEnum(userType)
  @IsNotEmpty()
  userType: userType;
}
