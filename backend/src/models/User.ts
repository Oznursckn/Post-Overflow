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

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  dateCreated: Date;

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
