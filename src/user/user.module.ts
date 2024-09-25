import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Post } from 'src/post/post.model';
import { Comment } from 'src/comments/comment.model';
import { FileModule } from 'src/file/file.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [SequelizeModule.forFeature([User, Post, Comment]), FileModule],
    exports: [UserService],
})
export class UserModule {}
