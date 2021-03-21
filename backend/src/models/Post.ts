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

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text" })
  body: string;

  @Column()
  dateCreated: Date;

  @Column()
  like: number;

  @Column({ type: "uuid", select: false, nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "SET NULL" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag,(tag) => tag.posts )
  @JoinTable()
  tags: Tag[];
  
}
