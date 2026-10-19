import Entity from "../@shared/entity";
import UniqueEntityId from "../@shared/value-objects/unique-entity-id.vo";
import Stock from "./stock.entity";

type UserProps = {
  age: number;
  riskTolerance: string;
  investmentGoal: string;
  preferredSectors: string[];
  stocks?: Stock[];
};

export class UserId extends UniqueEntityId {}

export default class User extends Entity<UserProps> {
  private _age: number;
  private _riskTolerance: string;
  private _investmentGoal: string;
  private _preferredSectors: string[];
  private _stocks: Stock[];

  constructor(
    props: UserProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this._age = props.age;
    this._riskTolerance = props.riskTolerance;
    this._investmentGoal = props.investmentGoal;
    this._preferredSectors = props.preferredSectors;
    this._stocks = props.stocks || [];
  }

  get age(): number {
    return this._age;
  }

  get riskTolerance(): string {
    return this._riskTolerance;
  }

  get investmentGoal(): string {
    return this._investmentGoal;
  }

  get preferredSectors(): string[] {
    return this._preferredSectors;
  }

  get stocks(): Stock[] {
    return this._stocks;
  }
}
