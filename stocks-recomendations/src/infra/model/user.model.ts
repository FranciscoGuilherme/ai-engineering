import { Column, DataType, Table } from "sequelize-typescript";
import BaseModel from "./base.model";

@Table({
  tableName: "app_user",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class UserModel extends BaseModel {
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare age: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM("low", "moderate", "high"),
    field: "risk_tolerance",
  })
  declare riskTolerance: string;

  @Column({ allowNull: false, field: "investment_goal" })
  declare investmentGoal: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT), field: "preferred_sectors" })
  declare preferredSectors: string[];

  @Column({ allowNull: false, type: DataType.TSVECTOR })
  declare vector: number[];

  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updatedAt: Date;
}
