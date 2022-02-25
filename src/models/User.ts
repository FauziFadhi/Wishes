import { Column, Model, Table } from 'sequelize-typescript';

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
  lastName?: string | undefined;

  @Column
  birthDate!: string | Date;

  @Column
  timezone!: string;
}
