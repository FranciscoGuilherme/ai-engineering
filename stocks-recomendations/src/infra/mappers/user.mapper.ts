import UniqueEntityId from "../../core/@shared/value-objects/unique-entity-id.vo";
import User from "../../core/entities/user.entity";
import UserModel from "../model/user.model";
import StockMapper from "./stock.mapper";

export default class UserMapper {
  static CollectionToEntities(users: UserModel[]): User[] {
    return [];
  }

  static ToEntity(user: UserModel): User {
    return new User(
      {
        age: user.age,
        investmentGoal: user.investmentGoal,
        preferredSectors: user.preferredSectors,
        riskTolerance: user.riskTolerance,
        stocks: StockMapper.,
      },
      new UniqueEntityId(user.id),
    );
  }
}
