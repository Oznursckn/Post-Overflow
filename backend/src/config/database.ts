import { createConnection } from "typeorm";

import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
import Tag from "../models/Tag";

export async function connectToDatabase() {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "post-overflow",
    entities: [Post,User,Comment,Tag],
    synchronize: true,
  });
  console.log(`${`[Server]`.green} Veritabanına Bağlanıldı`);
  return connection;
}
