import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import User from "./User";
import Comment from "./Comment";
import Tag from "./Tag";

@Entity({ name: "post" })
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text" })
  body: string;

  @Column()
  slug: string;

  @Column()
  dateCreated: Date;

  @Column()
  likes: number;

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @Column({ type: "uuid", select: false, nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "SET NULL" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
