// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { Comment } from 'src/comments/comment.entity';
import { Like } from 'src/likes/like.entity';
import { User } from 'src/users/user.entity';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Like) private likesRepository: Repository<Like>,
  ) {}

  async createPost(createPostDto: CreatePostDto, userId) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    console.log('1');
    const post = this.postsRepository.create({
      ...createPostDto,
      author: user,
    });
    console.log('1');
    return this.postsRepository.save(post);
  }

  // async addComment(
  //   postId: number,
  //   content: string,
  //   author: User,
  // ): Promise<Comment> {
  //   const post = await this.postsRepository.findOne({ where: { id: postId } });
  //   if (!post) throw new NotFoundException('Post not found');

  //   const comment = this.commentsRepository.create({ content, author, post });
  //   return this.commentsRepository.save(comment);
  // }

  async likePost(postId: number, user: User): Promise<Like> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['likes'],
    });
    if (!post) throw new NotFoundException('Post not found');

    const existingLike = await this.likesRepository.findOne({
      where: { post: { id: postId }, user },
    });
    if (existingLike) throw new Error('User already liked this post');

    const like = this.likesRepository.create({ post, user });
    return this.likesRepository.save(like);
  }

  async getPostById(postId: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id: postId },
      relations: [
        'author',
        'comments',
        'comments.author',
        'likes',
        'likes.user',
      ],
    });
  }
}
