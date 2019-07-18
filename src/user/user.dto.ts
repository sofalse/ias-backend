import {
  IsEmail,
  IsNotEmpty,
  IsAlphanumeric,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
