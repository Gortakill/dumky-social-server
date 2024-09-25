import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsOptional()
    avatar: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    @Length(5, 16)
    password: string;
}

export class UpdateUserDto {
    name: string;
    surname: string;
    username: string;
}
