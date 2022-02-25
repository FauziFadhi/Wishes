import { Migration } from '@config/migration.config';
import { container } from 'tsyringe';
import { TimezoneService } from 'src/middleware/timezone/timezone.service';
import Timezone from 'src/models/Timezone';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    const timezoneService = container.resolve(TimezoneService);

    await timezoneService.store();
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async () => {
    Timezone.truncate({
      cascade: true,
      restartIdentity: true,
      force: true,
    });
  });
};
