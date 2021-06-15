import { createConnection } from "typeorm";

import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
import Tag from "../models/Tag";

export async function connectToDatabase() {
  const connection = await createConnection({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Post,User,Comment,Tag],
    synchronize: true,
  });
  console.log(`${`[Server]`.green} Connected to database`);
  return connection;
}
