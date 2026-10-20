import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import BaseModel from "./base.model";
import UserModel from "./user.model";

@Table({
  tableName: "user_train_data",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class UserTrainDataModel extends BaseModel {
  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.UUID, field: "user_id" })
  declare userId: string;

  @Column({ allowNull: false, type: DataType.INTEGER, field: "model_version" })
  declare modelVersion: number;

  @Column({ type: DataType.DATE, field: "deleted_at" })
  declare deletedAt: Date;
}
