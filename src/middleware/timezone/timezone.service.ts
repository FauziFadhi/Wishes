import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';
import Timezone from 'src/models/Timezone';
import HttpException from 'src/utils/HttpException';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class TimezoneService {
  private host = 'http://worldtimeapi.org/api';

  private endpointTimezone = 'timezone';

  /**
   * get data from timezones api
   * @returns
   */
  async retrieveTimezones(): Promise<string[]> {
    const timezones = readFileSync('timezone.json');

    return JSON.parse(timezones as any);
  }

  /**
   * retrieve data from api and store it to database
   */
  async store() {
    const timezones = await this.retrieveTimezones();
    console.log(timezones);
    const mappedTimezones = timezones.map((timezone) => {
      return {
        name: timezone,
      };
    });

    await Timezone.bulkCreate(mappedTimezones);
  }
}
