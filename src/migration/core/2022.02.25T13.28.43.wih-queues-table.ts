import { DataType } from 'sequelize-typescript';
import { Migration } from '@config/migration.config';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.createTable('wish_queues', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wish_id: {
        type: DataType.INTEGER,
        references: {
          model: 'wishes',
          key: 'id',
        },
        allowNull: false,
      },
      send_at: {
        type: DataType.DATE,
        allowNull: false,
      },
      sent_at: {
        type: DataType.DATE,
        allowNull: true,
      },
      is_sent: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
      payload: {
        type: DataType.JSONB,
      },
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      deleted_at: DataType.DATE,
    });

    await queryInterface.addIndex('wish_queues', ['wish_id', 'send_at'], {
      unique: true,
      where: {
        deleted_at: null,
      },
    });
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.removeIndex('wish_queues', ['wish_id', 'send_at'], {
      unique: true,
      where: {
        deleted_at: null,
      },
    });
    await queryInterface.dropTable('wish_queues');
  });
};
