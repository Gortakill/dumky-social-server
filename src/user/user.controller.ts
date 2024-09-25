import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/CreateUserDto';
import { AuthGuard } from 'src/guard/AuthGuard';
import { RequestUser } from 'src/comments/comments.controller';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Put()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    updateAvatar(@UploadedFile() avatar: any, @Req() req: RequestUser) {
        return this.userService.updateAvatar(avatar, req.user.id);
    }

    @Put('/update')
    @UseGuards(AuthGuard)
    updateUserInfo(@Body() dto: UpdateUserDto, @Req() req: RequestUser) {
        return this.userService.updateUserInfo(dto, req.user.id);
    }

    @Get('/byId')
    @UseGuards(AuthGuard)
    getUserById(@Req() req: RequestUser) {
        return this.userService.getUserById(req.user.id);
    }

    @Get('/another/:id')
    getAnotherUserById(@Param('id') id: number) {
        return this.userService.getAnotherUserById(id);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
}
