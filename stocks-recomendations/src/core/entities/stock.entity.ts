import Entity from "../@shared/entity";
import UniqueEntityId from "../@shared/value-objects/unique-entity-id.vo";

type StockProps = {
  price: number;
  sector: string;
  exchange: string;
  riskLevel: string;
  revenue: number;
};

export default class Stock extends Entity<StockProps> {
  private _price: number;
  private _sector: string;
  private _exchange: string;
  private _riskLevel: string;
  private _revenue: number;

  public static readonly allowedRiskLevels = ["high", "moderate", "low"];

  constructor(props: StockProps, id?: UniqueEntityId) {
    super(props, id);
    this.validate();
    this._price = props.price;
    this._sector = props.sector;
    this._exchange = props.exchange;
    this._riskLevel = props.riskLevel;
    this._revenue = props.revenue;
  }

  get price(): number {
    return this._price;
  }

  get sector(): string {
    return this._sector;
  }

  get exchange(): string {
    return this._exchange;
  }

  get riskLevel(): string {
    return this._riskLevel;
  }

  get revenue(): number {
    return this._revenue;
  }

  private validate(): void {
    if (!Object.values(Stock.allowedRiskLevels).includes(this.riskLevel)) {
      throw new Error(
        `Invalid stock risk level. Allowed levels: ${Stock.allowedRiskLevels}`,
      );
    }
  }
}
