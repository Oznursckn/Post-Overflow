import { createConnection } from "typeorm";

import Post from "../models/Post";
import User from "../models/User";

export async function connectToDatabase() {
  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "post-overflow",
    entities: [User, Post],
    synchronize: true,
  });
  console.log(`${`[Server]`.green} Veritabanına Bağlanıldı`);
  return connection;
}
