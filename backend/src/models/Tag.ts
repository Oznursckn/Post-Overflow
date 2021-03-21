import {
    Column,
    Entity,
    BaseEntity,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable
} from "typeorm";
import Post from "./Post";
@Entity()
export default class Tag extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({length:50})
    title:string;

    @ManyToMany(() => Post, (post) =>post.tags)
    posts:Post[];

}