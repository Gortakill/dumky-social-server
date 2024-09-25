import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/CommentDto';
import { AuthGuard } from 'src/guard/AuthGuard';
import { User } from 'src/user/user.model';

export interface RequestUser extends Request {
    user: {
        id: number;
        email: string;
        username: string;
    };
}

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}

    @Post(':postId')
    @UseGuards(AuthGuard)
    createComment(
        @Body() dto: CommentDto,
        @Req() req: RequestUser,
        @Param() param: { postId: number },
    ) {
        return this.commentService.createComment(
            dto,
            req.user.id,
            param.postId,
        );
    }

    @Get(':postId')
    getAllComments(@Param('postId') postId) {
        return this.commentService.getAllComments(postId);
    }

    @Get('/byId/:postId')
    getCommentById(@Param('postId') postId: number) {
        return this.commentService.getCommentByPostId(postId);
    }

    @Delete(':postId')
    deleteComment(@Param('postId') postId: number) {
        return this.commentService.deleteComment(postId);
    }
}
