import { Expose } from 'class-transformer';

export class UserVm {
  @Expose()
  id!: number;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  birthDate!: string;

  @Expose()
  timezone!: string;
}
