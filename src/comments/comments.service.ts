import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CommentDto } from './dto/CommentDto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment) private commentRepository: typeof Comment,
    ) {}

    async createComment(dto: CommentDto, userId: number, postId: number) {
        if (!postId) {
            throw new HttpException(
                'Post not specified',
                HttpStatus.BAD_REQUEST,
            );
        }
        return await this.commentRepository.create({ ...dto, userId, postId });
    }

    async getAllComments(postId: number) {
        return await this.commentRepository.findAll({ where: { postId } });
    }

    async getCommentByPostId(postId: number) {
        return await this.commentRepository.findAll({ where: { postId } });
    }

    async deleteComment(postId: number) {
        const comment = await this.commentRepository.findAll({
            where: { postId },
        });
        if (!comment) {
            throw new HttpException(
                'Comment is not found',
                HttpStatus.NOT_FOUND,
            );
        }
        await this.commentRepository.destroy({ where: { postId } });
        return {
            message: 'Comment succesed deleted',
            status: 200,
        };
    }
}
