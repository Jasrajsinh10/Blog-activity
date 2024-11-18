// src/posts/posts.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Request,
  Get,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Body('userId') userId: number,
  ) {
    // Extract user from request (from JWT token)
    return this.postsService.createPost(createPostDto, userId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post(':postId/comments')
  // async addComment(
  //   @Param('postId', ParseIntPipe) postId: number,
  //   @Body('content') content: string,
  //   @Request() req,
  // ) {
  //   return this.postsService.addComment(postId, content, req.user);
  // }

  @Post(':postId/like')
  async likePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Request() req,
  ) {
    return this.postsService.likePost(postId, req.user);
  }

  @Get(':postId')
  async getPostById(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.getPostById(postId);
  }
}
