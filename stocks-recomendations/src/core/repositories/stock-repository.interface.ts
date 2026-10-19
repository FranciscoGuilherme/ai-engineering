import RepositoryInterface from "../@shared/repository-interface";
import Stock from "../entities/stock.entity";

export default interface StockRepositoryInterface extends RepositoryInterface<Stock> {}
