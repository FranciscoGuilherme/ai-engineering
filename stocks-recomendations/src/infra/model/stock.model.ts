import { Column, DataType, Table } from "sequelize-typescript";
import BaseModel from "./base.model";

type RiskLevel = "low" | "moderate" | "high";

@Table({
  tableName: "stock",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class StockModel extends BaseModel {
  @Column({
    allowNull: false,
    type: DataType.DECIMAL(18, 6),
    field: "close_price",
  })
  declare closePrice: number;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  declare sector: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  declare exchange: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM("low", "moderate", "high"),
    field: "risk_level",
  })
  declare riskLevel: RiskLevel;

  @Column({ allowNull: false, type: DataType.DECIMAL(18, 6) })
  declare revenue: number;

  @Column({ allowNull: false, type: DataType.TSVECTOR })
  declare vector: number[];

  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updatedAt: Date;

  @Column({ type: DataType.DATE, field: "deleted_at" })
  declare deletedAt: Date;
}
