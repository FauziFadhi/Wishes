import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './User';

interface IModelOptional {
  id: number;
}

interface IModel extends Partial<IModelOptional> {
  name: string;
}

type ICreateModel = Omit<IModel, 'id'>;

@Table({
  paranoid: true,
  indexes: [
    {
      fields: ['name'],
      where: {
        deleted_at: null,
      },
      unique: true,
    },
  ],
})
export default class Timezone
  extends Model<IModel, ICreateModel>
  implements IModel
{
  @PrimaryKey
  @Column
  name!: string;

  @HasMany(() => User, 'timezone')
  user?: User;
}
