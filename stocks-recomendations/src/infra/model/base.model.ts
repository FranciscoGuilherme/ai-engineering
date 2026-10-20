import { Column, DataType, Model, PrimaryKey } from "sequelize-typescript";

export default class BaseModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.DATE, field: "created_at" })
  declare createdAt: Date;
}
