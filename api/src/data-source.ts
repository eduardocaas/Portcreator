import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Certification } from "./models/Certification";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Certification],
  subscribers: [],
  migrations: ["src/data/migrations/*.ts"]
});