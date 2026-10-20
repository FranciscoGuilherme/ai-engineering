"use strict";

const pgvector = require("pgvector/sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    pgvector.registerTypes(Sequelize);
    await queryInterface.createTable("stock", {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      close_price: { type: Sequelize.DECIMAL(18, 6), allowNull: false },
      sector: { type: Sequelize.STRING(50), allowNull: false },
      exchange: { type: Sequelize.STRING(50), allowNull: false },
      risk_level: {
        type: Sequelize.ENUM("low", "moderate", "high"),
        allowNull: false,
      },
      revenue: { type: Sequelize.DECIMAL(18, 6), allowNull: false },
      vector: { type: Sequelize.DataTypes.VECTOR(5) },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("stock");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_stock_risk_level";',
    );
  },
};
