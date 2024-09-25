import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { CreatePostDto } from './dto/CreatePostDto';
import { FileService } from 'src/file/file.service';
import { CommentsService } from 'src/comments/comments.service';
import { AnswerService } from 'src/answer/answer.service';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FileService,
        private commentService: CommentsService,
        private answerService: AnswerService,
    ) {}

    async createPost(dto: CreatePostDto, image: any, id: number) {
        try {
            const file = await this.fileService.createFile(image);
            const post = await this.postRepository.create({
                ...dto,
                image: file,
                userId: id,
            });
            return post;
        } catch (err) {
            throw new HttpException(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getAllPosts(limit: number, page: number) {
        try {
            const posts = await this.postRepository.findAll({
                limit,
                offset: (page - 1) * limit,
            });
            return posts;
        } catch (err) {
            throw new HttpException('Failed get posts', 500);
        }
    }

    async getPostById(id: number) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        return post;
    }

    async getPostByUserId(userId: number) {
        const posts = await this.postRepository.findAll({ where: { userId } });
        if (!posts) {
            throw new HttpException(
                'This user has no posts',
                HttpStatus.NOT_FOUND,
            );
        }
        return posts;
    }

    async deletePost(id: number) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        const comment = await this.commentService.getCommentByPostId(post.id);
        if (comment) {
            await this.commentService.deleteComment(post.id);
            comment.forEach(async (comment) => {
                const answer = await this.answerService.getAnswerByCommentId(
                    comment.id,
                );
                if (answer) {
                    await this.answerService.deleteAnswer(comment.id);
                }
            });
        }
        await this.fileService.deleteFile(post.image);
        await this.postRepository.destroy({ where: { id } });
        return {
            message: 'Post is succesed delete',
            status: 200,
        };
    }
}
