import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import BaseModel from "../model/base.model";
import StockModel from "../model/stock.model";

@Table({
  tableName: "stock_prices",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class StockPricesModel extends BaseModel {
  @ForeignKey(() => StockModel)
  @Column({ allowNull: false, type: DataType.UUID, field: "stock_id" })
  declare stockId: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(18, 6) })
  declare price: number;

  @Column({ type: DataType.DATE, field: "deleted_at" })
  declare deletedAt: Date;
}
