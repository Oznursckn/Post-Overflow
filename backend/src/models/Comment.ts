import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  body: string;

  @Column()
  like: number;

  @Column()
  dislike: number;

  @Column()
  dateCreated: Date;

  @Column({ type: "uuid", select: false, nullable: true })
  userId: string;

  @Column({ type: "uuid", select: false, nullable: false })
  postId: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "SET NULL" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Post, (post) => post.user, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Post;
}
