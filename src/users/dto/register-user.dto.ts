import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}