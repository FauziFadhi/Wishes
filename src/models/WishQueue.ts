import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Wish from './Wish';

interface IModelOptional {
  id: number;
  sentAt: Date;
  isSent: boolean;
}

interface IModel extends Partial<IModelOptional> {
  wishId: number;
  sendAt: Date;
  payload: any;
}

type ICreateModel = Omit<IModel, 'id'>;

@Table({
  paranoid: true,
  indexes: [
    {
      fields: ['wish_id', 'send_at'],
      where: {
        deleted_at: null,
      },
      unique: true,
    },
  ],
})
export default class WishQueue
  extends Model<IModel, ICreateModel>
  implements IModel
{
  @ForeignKey(() => Wish)
  @Column
  wishId!: number;

  @Column
  isSent!: boolean;

  @Column
  sendAt!: Date;

  @Column
  sentAt!: Date;

  @Column(DataType.JSONB)
  payload!: any;
}
