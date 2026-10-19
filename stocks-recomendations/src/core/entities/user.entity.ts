import Entity from "../@shared/entity";
import UniqueEntityId from "../@shared/value-objects/unique-entity-id.vo";

type UserProps = {
  age: number;
  riskTolerance: string;
  investmentGoal: string;
  preferredSectors: string[];
};

export class UserId extends UniqueEntityId {}

export default class User extends Entity<UserProps> {
  private _age: number;
  private _riskTolerance: string;
  private _investmentGoal: string;
  private _preferredSectors: string[];

  constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
    this._age = props.age;
    this._riskTolerance = props.riskTolerance;
    this._investmentGoal = props.investmentGoal;
    this._preferredSectors = props.preferredSectors;
  }

  get age(): number {
    return this.props.age;
  }

  get riskTolerance(): string {
    return this.props.riskTolerance;
  }

  get investmentGoal(): string {
    return this.props.investmentGoal;
  }

  get preferredSectors(): string[] {
    return this.props.preferredSectors;
  }
}
