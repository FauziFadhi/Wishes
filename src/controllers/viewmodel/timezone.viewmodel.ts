import { Expose } from 'class-transformer';

export class TimezoneVm {
  @Expose()
  name!: string;
}
