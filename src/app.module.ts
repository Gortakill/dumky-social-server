import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { PostModule } from './post/post.module';
import { Post } from './post/post.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { SocketService } from './socket/socket.service';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.model';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/answer.model';
import { FriendsModule } from './friends/friends.module';
import { Friends } from './friends/friends.model';
import { Room } from './room/rooms.model';
import { RoomModule } from './room/room.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'src', 'static'),
        }),
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        SequelizeModule.forRoot({
            uri: process.env.DATABASE_URL,
            dialect: 'postgres',
            models: [User, Post, Comment, Answer, Friends, Room],
            autoLoadModels: true,
        }),
        UserModule,
        PostModule,
        FileModule,
        AuthModule,
        CommentsModule,
        AnswerModule,
        FriendsModule,
        RoomModule,
    ],
    controllers: [],
    providers: [SocketService],
})
export class AppModule {}
