import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/guard/AuthGuard';
import { RequestUser } from 'src/comments/comments.controller';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Post(':friendId')
    @UseGuards(AuthGuard)
    createRoom(@Req() req: RequestUser, @Param('friendId') friendId: number) {
        return this.roomService.createRoom(req.user.id, friendId);
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllUserRoom(@Req() req: RequestUser) {
        return this.roomService.getAllUserRoom(req.user.id);
    }
}
