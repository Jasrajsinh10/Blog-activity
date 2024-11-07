// src/users/users.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from 'src/posts/post.entity'; // Adjust import
import { Comment } from 'src/comments/comment.entity'; // Adjust import pathpath
import { Like } from 'src/likes/like.entity'; // Adjust import path
import { userType } from './enums/userType.enum';
// import { Follow } from 'src/follows/follow.entity'; // Adjust import path

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: userType,
    nullable: false,
    default: userType.USER,
  })
  userType: userType;

  @Column()
  password: string; // Store hashed password

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
