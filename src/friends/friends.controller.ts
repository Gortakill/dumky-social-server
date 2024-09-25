import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from 'src/guard/AuthGuard';
import { RequestUser } from 'src/comments/comments.controller';

@Controller('friends')
export class FriendsController {
    constructor(private friendService: FriendsService) {}

    @Post(':friendId')
    @UseGuards(AuthGuard)
    addFriend(@Req() req: RequestUser, @Param('friendId') friendId: number) {
        return this.friendService.addFriend(req.user.id, friendId);
    }

    @Patch(':userId')
    @UseGuards(AuthGuard)
    confirmedFriend(@Req() req: RequestUser, @Param('userId') userId: number) {
        return this.friendService.ConfirmedFriend(userId, req.user.id);
    }

    @Get('/unconfirmed')
    @UseGuards(AuthGuard)
    getUnconfirmedFriend(@Req() req: RequestUser) {
        return this.friendService.getUnconfirmedFriend(req.user.id);
    }

    @Get()
    @UseGuards(AuthGuard)
    getFriends(@Req() req: RequestUser) {
        return this.friendService.getFriends(req.user.id);
    }

    @Delete('/delete/:friendId')
    @UseGuards(AuthGuard)
    deleteFriend(@Req() req: RequestUser, @Param('friendId') friendId: number) {
        return this.friendService.deleteFriend(req.user.id, friendId);
    }
}
