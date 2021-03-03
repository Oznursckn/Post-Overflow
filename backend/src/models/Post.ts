import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
} from "typeorm";
import User from "./User";
import Comment from "./Comment";


@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({type:"text"})
  body: string;

  @Column()
  dateCreated: Date;

  @Column()
  like: number;

  @Column({ type: "uuid", select: false, length: 36, nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "SET NULL" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, {onDelete:"CASCADE"})
  comments: Comment[];
}
