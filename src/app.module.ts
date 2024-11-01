import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [UsersModule, PostsModule, CommentsModule, LikesModule, FollowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
