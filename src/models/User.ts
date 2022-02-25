import { Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import Timezone from './Timezone';
import Wish from './Wish';

interface IModelOptional {
  id: number;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface IModel extends Partial<IModelOptional> {
  firstName: string;
  birthDate: Date | string;
  timezone: string;
}

type ICreateModel = Omit<IModel, 'id'>;

@Table({
  paranoid: true,
  indexes: [
    {
      fields: ['timezone', 'birth_date'],
    },
    {
      fields: ['first_time', 'last_name'],
      where: {
        deleted_at: null,
      },
      unique: true,
    },
  ],
})
export default class User
  extends Model<IModel, ICreateModel>
  implements IModel
{
  @Column
  firstName!: string;

  @Column
  lastName?: string;

  @Column
  birthDate!: string;

  @ForeignKey(() => Timezone)
  @Column
  timezone!: string;

  @HasOne(() => Wish)
  wish?: Wish;
}
