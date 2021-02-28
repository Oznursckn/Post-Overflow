import { createConnection } from "typeorm";

import User from "./models/User";

export async function connectToDatabase() {
  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "post-overflow",
    entities: [User],
    synchronize: true,
  });
  console.log("Veritabanına Bağlanıldı");
  return connection;
}
