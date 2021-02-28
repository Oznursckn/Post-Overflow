import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
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

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
