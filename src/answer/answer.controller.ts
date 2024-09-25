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
import { AnswerService } from './answer.service';
import { AuthGuard } from 'src/guard/AuthGuard';
import { CreateAnswerDto } from './dto/CreateAnswerDto';
import { RequestUser } from 'src/comments/comments.controller';

@Controller('answer')
export class AnswerController {
    constructor(private answerService: AnswerService) {}

    @Post(':commentId')
    @UseGuards(AuthGuard)
    createAnswer(
        @Body() dto: CreateAnswerDto,
        @Req() req: RequestUser,
        @Param('commentId') commentId: number,
    ) {
        return this.answerService.createAnswer(dto, commentId, req.user.id);
    }

    @Get(':commentId')
    getAllAnswersByComment(@Param('commentId') commentId: number) {
        return this.answerService.getAllAnswerByComment(commentId);
    }

    @Get('/byId/:commentId')
    getAnswerById(@Param('commentId') commentId: number) {
        return this.answerService.getAnswerByCommentId(commentId);
    }

    @Delete(':commentId')
    deleteAnswer(@Param('commentId') commentId: number) {
        return this.answerService.deleteAnswer(commentId);
    }
}
