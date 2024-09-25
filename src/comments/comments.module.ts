import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { User } from 'src/user/user.model';
import { Post } from 'src/post/post.model';
import { Answer } from 'src/answer/answer.model';

@Module({
    providers: [CommentsService],
    controllers: [CommentsController],
    imports: [SequelizeModule.forFeature([Comment, User, Post, Answer])],
    exports: [CommentsService],
})
export class CommentsModule {}
