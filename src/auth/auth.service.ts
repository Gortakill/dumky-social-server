import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/LoginUserDto';

type UserData = {
    id: number;
    email: string;
    username: string;
};

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async registration(dto: CreateUserDto): Promise<{ token: string }> {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException(
                `User with email: ${dto.email} is alredy created`,
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser({
            ...dto,
            password: hashPassword,
        });
        return await this.generateToken(user);
    }

    async login(dto: LoginUserDto): Promise<{ token: string }> {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (!candidate) {
            throw new HttpException(
                `Login or password is not correct`,
                HttpStatus.BAD_REQUEST,
            );
        }
        const comparePassword = bcrypt.compareSync(
            dto.password,
            candidate.password,
        );
        if (!comparePassword) {
            throw new HttpException(
                `Login or password is not correct`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return await this.generateToken(candidate);
    }

    private async generateToken(data: UserData) {
        const payload = {
            id: data.id,
            email: data.email,
            username: data.username,
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            token: token,
        };
    }
}
