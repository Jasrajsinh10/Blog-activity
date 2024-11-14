import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { Like } from 'src/likes/like.entity';
import { PostsService } from './providers/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comment.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Like, User])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
