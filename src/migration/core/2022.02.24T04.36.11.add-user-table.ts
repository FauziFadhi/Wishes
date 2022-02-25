import { DataType } from 'sequelize-typescript';
import { Migration } from '@config/migration.config';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.createTable('users', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataType.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataType.STRING,
        allowNull: true,
      },
      birth_date: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      timezone: {
        type: DataType.STRING,
        references: {
          key: 'name',
          model: 'timezones',
        },
        allowNull: false,
      },
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: DataType.DATE,
    });

    await queryInterface.addIndex('users', ['timezone', 'birth_date']);
    await queryInterface.addIndex('users', ['first_name', 'last_name'], {
      unique: true,
      where: { deleted_at: null },
    });
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    queryInterface.removeIndex('users', ['timezone', 'birth_date']);
    queryInterface.removeIndex('users', ['first_name', 'last_name'], {
      unique: true,
      where: { deleted_at: null },
    });
    await queryInterface.dropTable('users');
  });
};
