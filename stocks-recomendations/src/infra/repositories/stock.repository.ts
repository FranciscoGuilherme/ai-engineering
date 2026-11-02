import Stock from "../../core/entities/stock.entity";
import StockRepositoryInterface from "../../core/repositories/stock-repository.interface";
import BaseRepository from "./base.repository";

export default class StockRepository
  extends BaseRepository<Stock>
  implements StockRepositoryInterface {}
