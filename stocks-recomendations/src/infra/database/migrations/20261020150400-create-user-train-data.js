"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_train_data", {
      id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
      user_id: { type: Sequelize.UUID, allowNull: false, references: { model: "app_user", key: "id" } },
      model_version: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("user_train_data");
  },
};
