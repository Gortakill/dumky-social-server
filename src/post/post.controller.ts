import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePostDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guard/AuthGuard';
import { RequestUser } from 'src/comments/comments.controller';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    createPost(
        @Body() dto: CreatePostDto,
        @UploadedFile() image: any,
        @Req() req,
    ) {
        return this.postService.createPost(dto, image, req.user.id);
    }

    @Get()
    getAllPosts(@Req() req) {
        return this.postService.getAllPosts(req.query.limit, req.query.page);
    }

    @Get('/byId/:postId')
    getPostById(@Param('postId') postId: number) {
        return this.postService.getPostById(postId);
    }

    @Get('/byUser')
    @UseGuards(AuthGuard)
    getPostsByUserId(@Req() req: RequestUser) {
        console.log(req.user.id);
        return this.postService.getPostByUserId(req.user.id);
    }

    @Delete('/delete/:postId')
    deletePost(@Param('postId') postId: number) {
        return this.postService.deletePost(postId);
    }
}
