import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Note } from "./notes/notes.entity";
import { User } from "./users/users.entity";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  username: "postgres",
  password: "12345",
  port: 5431,
  host: "127.0.0.1",
  database: "notasDB",
  synchronize: true,
  entities: [
    User,
    Note,
  ]
}