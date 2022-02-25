import Timezone from 'src/models/Timezone';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class TimezoneService {
  async timezones() {
    return Timezone.findAll();
  }
}
