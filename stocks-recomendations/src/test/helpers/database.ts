import { afterEach, beforeEach } from "@jest/globals";
import { Sequelize, type ModelCtor } from "sequelize-typescript";

export function useTestDatabase(models: ModelCtor[] = []) {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      models,
    });

    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  return {
    get sequelize() {
      return sequelize;
    },
  };
}
