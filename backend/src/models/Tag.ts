import {
  Column,
  Entity,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Post from "./Post";
@Entity({ name: "tag" })
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
