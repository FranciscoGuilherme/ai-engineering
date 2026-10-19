import Stock from "../entity/stock.entity";
import RepositoryInterface from "../@shared/repository-interface";

export default interface StockRepositoryInterface extends RepositoryInterface<Stock> {}
