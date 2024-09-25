import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { CreateAnswerDto } from './dto/CreateAnswerDto';

@Injectable()
export class AnswerService {
    constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

    async createAnswer(
        dto: CreateAnswerDto,
        commentId: number,
        userId: number,
    ) {
        try {
            return await this.answerRepository.create({
                ...dto,
                commentId,
                userId,
            });
        } catch (e) {
            throw new HttpException(
                'Failed to create answer',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getAllAnswerByComment(commentId: number) {
        try {
            return await this.answerRepository.findAll({
                where: { commentId },
            });
        } catch (e) {
            throw new HttpException(
                'Failed to load answers',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getAnswerByCommentId(commentId: number) {
        return await this.answerRepository.findOne({ where: { commentId } });
    }

    async deleteAnswer(commentId: number) {
        const answer = await this.answerRepository.findOne({
            where: { commentId },
        });
        if (!answer) {
            throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
        }
        await this.answerRepository.destroy({ where: { commentId } });
        return {
            message: 'Answer succesed deleted',
            status: 200,
        };
    }
}
