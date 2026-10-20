"use strict";

const pgvector = require("pgvector/sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    pgvector.registerTypes(Sequelize);
    await queryInterface.createTable("app_user", {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      age: { type: Sequelize.INTEGER, allowNull: false },
      risk_tolerance: {
        type: Sequelize.ENUM("low", "moderate", "high"),
        allowNull: false,
      },
      investment_goal: { type: Sequelize.STRING, allowNull: false },
      preferred_sectors: { type: Sequelize.ARRAY(Sequelize.TEXT) },
      vector: { type: Sequelize.DataTypes.VECTOR(5) },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("app_user");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_app_user_risk_tolerance";',
    );
  },
};
