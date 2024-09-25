import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUserDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }

    @Post('/login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto);
    }
}
