import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { Comment } from 'src/comments/comment.model';
import { User } from 'src/user/user.model';

@Module({
    providers: [AnswerService],
    controllers: [AnswerController],
    imports: [SequelizeModule.forFeature([Comment, Answer, User])],
    exports: [AnswerService],
})
export class AnswerModule {}
