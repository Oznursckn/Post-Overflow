import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
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
}
