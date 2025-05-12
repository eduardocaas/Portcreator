import { AppDataSource } from "./data-source";
import express from 'express';
import "dotenv/config"

AppDataSource.initialize().then(async => {
  const app = express();
  app.use(express.json())

  const PORT = process.env.APP_PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  })
});