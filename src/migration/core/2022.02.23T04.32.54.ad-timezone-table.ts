import { DataType } from 'sequelize-typescript';
import { Migration } from '@config/migration.config';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.createTable('timezones', {
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: DataType.DATE,
    });

    queryInterface.addIndex('timezones', ['name'], {
      unique: true,
    });
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    queryInterface.removeIndex('timezones', ['name'], {
      unique: true,
    });
    await queryInterface.dropTable('timezones');
  });
};
