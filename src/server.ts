import app from './app';
import { env } from './config/env';
import { db } from './config/db';

const startServer = async () => {
  await db.connect(); 

  app.listen(env.port, () => {
    console.log(`Server is running on http://localhost:${env.port}`);
  });
};

startServer();
