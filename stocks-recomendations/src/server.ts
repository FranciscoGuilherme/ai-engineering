import express from "express";
import router from "./infra/controller/router";
import sequelize from "./infra/database/sequelize";
import EventDispatcher from "./core/@shared/events/event-dispatcher";
import PredictionCalculatedEventHandler from "./core/events/prediction-calculated.event-handler";
import PredictionModelService from "./core/service/prediction-model.service";

const app = express();

app.use(express.json());
app.use(router);

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();
    const trainData = { users: [], stocks: [] };
    const predictionModel = new PredictionModelService(
      trainData,
      getEventDispatcher(),
    );
    app.listen(8080, () => console.log("server running on port 8080"));
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    await sequelize.close();
  }
}

function getEventDispatcher(): EventDispatcher {
  const eventDispatcher = new EventDispatcher();
  eventDispatcher.register(
    "PredictionCalculatedEvent",
    new PredictionCalculatedEventHandler(),
  );
  return eventDispatcher;
}

void startServer();
