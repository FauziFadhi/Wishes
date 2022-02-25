import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Timezone from './Timezone';
import User from './User';

interface IModelOptional {
  id: number;
}

export enum ENUM_WISHES_TYPE {
  'birthday' = 'birthday',
}

interface IModel extends Partial<IModelOptional> {
  userId: number;
  type: ENUM_WISHES_TYPE;
  lastWish: Date;
}

type ICreateModel = Omit<IModel, 'id'>;

@Table({
  paranoid: true,
  indexes: [
    {
      fields: ['type', 'user_id'],
      where: {
        deleted_at: null,
      },
      unique: true,
    },
  ],
})
export default class Wish
  extends Model<IModel, ICreateModel>
  implements IModel
{
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @Column
  type!: ENUM_WISHES_TYPE;

  @Column
  lastWish!: Date;
}
