import { Column, Model, Table } from 'sequelize-typescript';

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
  @Column
  name!: string;
}
