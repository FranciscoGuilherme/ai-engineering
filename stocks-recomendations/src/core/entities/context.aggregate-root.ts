import { AggregateRoot } from "../@shared/aggregate-root";
import { normalize } from "../@shared/utils/operations";
import UniqueEntityId from "../@shared/value-objects/unique-entity-id.vo";
import Stock from "./stock.entity";
import User from "./user.entity";

type UsersContext = {
  ages: number[];
  maxAge: number;
  minAge: number;
};

type StocksContext = {
  prices: number[];
  maxPrice: number;
  minPrice: number;
  sectors: string[];
  exchanges: string[];
  riskLevels: string[];
  sectorsIndex: Record<string, number>;
  exchangesIndex: Record<string, number>;
  riskLevelsIndex: Record<string, number>;
  revenues: number[];
  maxRevenue: number;
  minRevenue: number;
};

type RelatedContext = {
  ageSums: Record<string, number>;
  ageCounts: Record<string, number>;
  ageAverages: Record<string, number>;
};

type ContextProps = {
  users: User[];
  stocks: Stock[];
};

export default class Context extends AggregateRoot<ContextProps> {
  private readonly _dimensions: number;
  private readonly _userContext: {
    ages: number[];
    maxAge: number;
    minAge: number;
  };

  private readonly _stockContext: {
    prices: number[];
    maxPrice: number;
    minPrice: number;
    sectors: string[];
    exchanges: string[];
    riskLevels: string[];
    sectorsIndex: Record<string, number>;
    exchangesIndex: Record<string, number>;
    riskLevelsIndex: Record<string, number>;
    revenues: number[];
    maxRevenue: number;
    minRevenue: number;
  };

  private readonly _relatedContext: {
    ageSums: Record<string, number>;
    ageCounts: Record<string, number>;
    ageAverages: Record<string, number>;
  };

  constructor(props: ContextProps, id?: UniqueEntityId) {
    super(props, id);
    this.setUserContext(props.users);
    this.setStockContext(props.stocks);
    this.setRelatedContext(props);
    this._dimensions =
      this._stockContext.sectors.length +
      this._stockContext.exchanges.length +
      this._stockContext.riskLevels.length +
      2;
  }

  get dimensions(): number {
    return this._dimensions;
  }

  get usersContext(): UsersContext {
    return this._userContext;
  }

  get stocksContext(): StocksContext {
    return this._stockContext;
  }

  get relatedContext(): RelatedContext {
    return this._relatedContext;
  }

  private setUserContext(users: User[]): void {
    this._userContext.ages = users.map((user: User) => user.age);
    this._userContext.maxAge = Math.max(...this._userContext.ages);
    this._userContext.minAge = Math.min(...this._userContext.ages);
  }

  private setStockContext(stocks: Stock[]): void {
    this._stockContext.prices = stocks.map((stock: Stock) => stock.price);
    this._stockContext.maxPrice = Math.max(...this._stockContext.prices);
    this._stockContext.minPrice = Math.min(...this._stockContext.prices);
    this._stockContext.revenues = stocks.map((stock: Stock) => stock.revenue);
    this._stockContext.maxRevenue = Math.max(...this._stockContext.revenues);
    this._stockContext.minRevenue = Math.min(...this._stockContext.revenues);
    this._stockContext.sectors = Array.from(
      new Set(stocks.map((stock: Stock) => stock.sector)),
    );
    this._stockContext.exchanges = Array.from(
      new Set(stocks.map((stock: Stock) => stock.exchange)),
    );
    this._stockContext.riskLevels = Stock.allowedRiskLevels;
    this._stockContext.sectorsIndex = Object.fromEntries(
      this._stockContext.sectors.map((sector, index) => [sector, index]),
    );
    this._stockContext.exchangesIndex = Object.fromEntries(
      this._stockContext.exchanges.map((exchange, index) => [exchange, index]),
    );
    this._stockContext.riskLevelsIndex = Object.fromEntries(
      this._stockContext.riskLevels.map((riskLevel, index) => [
        riskLevel,
        index,
      ]),
    );
  }

  private setRelatedContext(props: ContextProps): void {
    props.users.forEach((user) => {
      user.stocks.forEach((stock) => {
        this._relatedContext.ageSums[stock.id] =
          (this._relatedContext.ageSums[stock.id] || 0) + user.age;
        this._relatedContext.ageCounts[stock.id] =
          (this._relatedContext.ageCounts[stock.id] || 0) + 1;
      });
    });

    this._relatedContext.ageAverages = Object.fromEntries(
      props.stocks.map((stock: Stock) => {
        let average = this._userContext.minAge + this._userContext.maxAge / 2;
        if (this._relatedContext.ageCounts[stock.id]) {
          average =
            this._relatedContext.ageSums[stock.id] /
            this._relatedContext.ageCounts[stock.id];
        }

        return [
          stock.id,
          normalize(
            average,
            this._userContext.minAge,
            this._userContext.maxAge,
          ),
        ];
      }),
    );
  }
}
