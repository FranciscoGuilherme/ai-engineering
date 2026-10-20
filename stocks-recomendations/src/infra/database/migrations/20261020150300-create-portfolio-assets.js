"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("portfolio_assets", {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      user_id: { type: Sequelize.UUID, allowNull: false, references: { model: "app_user", key: "id" } },
      stock_id: { type: Sequelize.UUID, allowNull: false, references: { model: "stock", key: "id" } },
      quantity: { type: Sequelize.DECIMAL(18, 8), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("portfolio_assets");
  },
};
