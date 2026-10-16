import express from 'express'
import router from './infra/controller/router';
import sequelize from './infra/database/sequelize';

const app = express();

app.use(express.json())
app.use(router)

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();
    app.listen(8080, () => console.log('server running on port 8080'));
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    await sequelize.close();
    process.exitCode = 1;
  }
}

void startServer();
