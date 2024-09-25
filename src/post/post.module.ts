import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Post } from './post.model';
import { FileModule } from 'src/file/file.module';
import { Comment } from 'src/comments/comment.model';
import { CommentsModule } from 'src/comments/comments.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
    controllers: [PostController],
    providers: [PostService],
    imports: [
        SequelizeModule.forFeature([Post, User, Comment]),
        FileModule,
        CommentsModule,
        AnswerModule,
    ],
})
export class PostModule {}
