// src/posts/posts.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity'; // Adjust import path
import { Comment } from 'src/comments/comment.entity'; // Adjust import path
import { Like } from 'src/likes/like.entity'; // Adjust import path

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  imageUrl: string; // Path to image file

  @Column({
    type: 'varchar',
    nullable: true,
  })
  videoUrl: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
