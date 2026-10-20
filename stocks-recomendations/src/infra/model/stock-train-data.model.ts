import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import BaseModel from "./base.model";
import StockModel from "./stock.model";

@Table({
  tableName: "stock_train_data",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class StockTrainDataModel extends BaseModel {
  @ForeignKey(() => StockModel)
  @Column({ allowNull: false, type: DataType.UUID, field: "stock_id" })
  declare stockId: string;

  @Column({ allowNull: false, type: DataType.INTEGER, field: "model_version" })
  declare modelVersion: number;

  @Column({ type: DataType.DATE, field: "deleted_at" })
  declare deletedAt: Date;
}
