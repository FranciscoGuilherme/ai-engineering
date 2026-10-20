"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stock_train_data", {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      stock_id: { type: Sequelize.UUID, allowNull: false, references: { model: "stock", key: "id" } },
      model_version: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("stock_train_data");
  },
};
