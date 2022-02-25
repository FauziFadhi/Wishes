import { DataType } from 'sequelize-typescript';
import { Migration } from '@config/migration.config';
import { ENUM_WISHES_TYPE } from '@models/Wish';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.createTable('wishes', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      type: {
        type: DataType.ENUM(...Object.values(ENUM_WISHES_TYPE)),
        allowNull: false,
      },
      last_wish: {
        type: DataType.DATE,
        allowNull: false,
      },
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: DataType.DATE,
    });

    await queryInterface.addIndex('wishes', ['type', 'user_id'], {
      unique: true,
      where: {
        deleted_at: null,
      },
    });
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.removeIndex('wishes', ['type', 'user_id'], {
      unique: true,
      where: {
        deleted_at: null,
      },
    });
    await queryInterface.dropTable('wishes');
  });
};
