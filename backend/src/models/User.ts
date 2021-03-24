import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Post from "./Post";
import Comment from "./Comment";
import { Expose } from "class-transformer";

@Entity()
export default class User extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Expose()
  @Column()
  firstName: string;

  @Expose()
  @Column()
  lastName: string;

  @Expose()
  @Column()
  email: string;

  @Expose()
  @Column()
  password: string;

  @Expose()
  @Column()
  dateCreated: Date;

  @Expose()
  @Column({ type: "text", nullable: true })
  about: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Post)
  @JoinTable()
  savedPosts: Post[];

  @ManyToMany(() => Post)
  @JoinTable()
  likedPosts: Post[];

  @ManyToMany(() => Comment)
  @JoinTable()
  likedComments: Comment[];

  @ManyToMany(() => Comment)
  @JoinTable()
  dislikedComments: Comment[];
}
