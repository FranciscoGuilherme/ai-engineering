import UniqueEntityId from "../../core/@shared/value-objects/unique-entity-id.vo";
import Stock from "../../core/entities/stock.entity";
import StockModel from "../model/stock.model";

export default class StockMapper {
  static CollectionToEntities(users: StockModel[]): Stock[] {
    return [];
  }

  static ToEntity(stock: StockModel): Stock {
    return new Stock(
      {
        price: stock.closePrice,
        sector: stock.sector,
        exchange: stock.exchange,
        riskLevel: stock.riskLevel,
        revenue: stock.revenue,
      },
      new UniqueEntityId(stock.id),
    );
  }
}
