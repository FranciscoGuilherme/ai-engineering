"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stock_prices", {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      stock_id: { type: Sequelize.UUID, allowNull: false, references: { model: "stock", key: "id" } },
      price: { type: Sequelize.DECIMAL(18, 6), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("stock_prices");
  },
};
