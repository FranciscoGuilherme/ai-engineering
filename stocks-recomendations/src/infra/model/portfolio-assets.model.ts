import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import BaseModel from "./base.model";
import StockModel from "./stock.model";
import UserModel from "./user.model";

@Table({
  tableName: "portfolio_assets",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class PortfolioAssetsModel extends BaseModel {
  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.UUID, field: "user_id" })
  declare userId: string;

  @ForeignKey(() => StockModel)
  @Column({ allowNull: false, type: DataType.UUID, field: "stock_id" })
  declare stockId: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(18, 8) })
  declare quantity: number;

  @Column({ type: DataType.DATE, field: "deleted_at" })
  declare deletedAt: Date;
}
