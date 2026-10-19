import * as tf from "@tensorflow/tfjs";
import Stock from "../entities/stock.entity";
import User from "../entities/user.entity";
import Context from "../entities/context.aggregate-root";
import { normalize } from "../@shared/utils/operations";
import { EventDispatcherInterface } from "../@shared/events/event-dispatcher.interface";
import EventInterface from "../@shared/events/event.interface";
import PredictionCalculatedEvent from "../events/prediction-calculated.event";

const WEIGHTS = {
  age: 0.1,
  price: 0.4,
  sector: 0.3,
  exchange: 0.2,
  riskLevel: 0.2,
};

type ModelParameters = {
  xs: tf.Tensor2D;
  ys: tf.Tensor2D;
  inputDimention: number;
};

export default class PredictionModelService {
  private model: tf.Sequential;
  private context: Context;

  constructor(
    private readonly modelData: { users: User[]; stocks: Stock[] },
    private readonly eventDispatcher: EventDispatcherInterface<EventInterface>,
  ) {
    this.context = new Context({
      users: this.modelData.users,
      stocks: this.modelData.stocks,
    });
  }

  public recommend(user: User) {
    if (!this.model) {
      throw new Error("Model not created");
    }

    const userVector = this.encodeUser(user);
    const inputs = [];
    const inputsTensor = tf.tensor2d(inputs);
    const predictions = this.model.predict(inputsTensor);

    if (Array.isArray(predictions)) {
      throw new Error("Expected a single prediction tensor");
    }

    const scores = predictions.dataSync();

    // TODO: finalizar as recomendações e o rank
  }

  async trainModel(): Promise<void> {
    if (!this.model) {
      throw new Error("Model not created");
    }
    const trainData = await this.createTrainingData(
      this.modelData.users,
      this.modelData.stocks,
    );
    await this.configureNeuralNet(trainData);
    const event = new PredictionCalculatedEvent();
    this.eventDispatcher.notify(event);
  }

  private async configureNeuralNet(trainData: ModelParameters): Promise<void> {
    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({
        inputShape: [trainData.inputDimention],
        units: 128,
        activation: "relu",
      }),
    );
    this.model.add(tf.layers.dense({ units: 64, activation: "relu" }));
    this.model.add(tf.layers.dense({ units: 32, activation: "relu" }));
    this.model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
    this.model.compile({
      optimizer: tf.train.adam(0.01),
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });

    await this.model.fit(trainData.xs, trainData.ys, {
      epochs: 100,
      batchSize: 32,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch: number, logs: tf.Logs) => {
          console.log("Epoch");
        },
      },
    });
  }

  private async createTrainingData(
    users: User[],
    stocks: Stock[],
  ): Promise<ModelParameters> {
    const inputs = [];
    const labels = [];

    users
      .filter((user: User) => user.stocks.length)
      .forEach((user: User) => {
        const userVector = this.encodeUser(user).dataSync();
        stocks.forEach((stock: Stock) => {
          const stockVector = this.encodeStock(stock).dataSync();
          const label = user.stocks.some((s: Stock) =>
            s.id === stock.id ? 1 : 0,
          );
          inputs.push(...userVector, ...stockVector);
          labels.push(label);
        });
      });

    return {
      xs: tf.tensor2d(inputs, [labels.length, this.context.dimensions * 2]),
      ys: tf.tensor2d(labels, [labels.length, 1]),
      inputDimention: this.context.dimensions * 2,
    };
  }

  private oneHotWeighted(
    index: number,
    length: number,
    weight: number,
  ): tf.Tensor1D {
    return tf.oneHot(index, length).cast("float32").mul(weight);
  }

  private encodeStock(stock: Stock): tf.Tensor1D {
    const price = tf.tensor1d([
      normalize(
        stock.price,
        this.context.stocksContext.minPrice,
        this.context.stocksContext.maxPrice,
      ) * WEIGHTS.price,
    ]);

    const age = tf.tensor1d([
      (this.context.relatedContext.ageAverages[stock.id] ?? 0.5) * WEIGHTS.age,
    ]);

    const sector = this.oneHotWeighted(
      this.context.stocksContext.sectorsIndex[stock.sector],
      this.context.stocksContext.sectors.length,
      WEIGHTS.sector,
    );

    const exchange = this.oneHotWeighted(
      this.context.stocksContext.exchangesIndex[stock.exchange],
      this.context.stocksContext.exchanges.length,
      WEIGHTS.exchange,
    );

    const riskLevel = this.oneHotWeighted(
      this.context.stocksContext.riskLevelsIndex[stock.riskLevel],
      this.context.stocksContext.riskLevels.length,
      WEIGHTS.riskLevel,
    );

    return tf.concat1d([price, age, sector, exchange, riskLevel]);
  }

  private encodeUser(user: User): tf.Tensor1D {
    if (!user.stocks?.length) {
      return tf
        .concat1d([
          tf.zeros([1]),
          tf.tensor1d([
            normalize(
              user.age,
              this.context.usersContext.minAge,
              this.context.usersContext.maxAge,
            ) * WEIGHTS.age,
          ]),
          tf.zeros([this.context.stocksContext.sectors.length]),
          tf.zeros([this.context.stocksContext.exchanges.length]),
          tf.zeros([this.context.stocksContext.riskLevels.length]),
        ])
        .reshape([1, this.context.dimensions]);
    }

    return tf
      .stack(user.stocks.map((stock: Stock) => this.encodeStock(stock)))
      .mean(0)
      .reshape([1, this.context.dimensions]);
  }
}
