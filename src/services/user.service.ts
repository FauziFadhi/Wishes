import Timezone from 'src/models/Timezone';
import User from 'src/models/User';
import HttpException from 'src/utils/http-exception';
import { autoInjectable } from 'tsyringe';
import {
  ICreateUserDTO,
  IUpdateUserDTO,
} from './interface/user-service.interface';

@autoInjectable()
export class UserService {
  /**
   * store user data
   * @param dto
   * @returns
   */
  async createUser(dto: ICreateUserDTO): Promise<User> {
    await Timezone.findOne({
      where: {
        name: dto.timezone,
      },

      rejectOnEmpty: new HttpException('Selected Timezone not valid.', 400),
    });

    return await User.create(dto).catch((e) => {
      if (e.name == 'SequelizeUniqueConstraintError') {
        throw new HttpException('Duplicate name', 400);
      }
      throw e;
    });
  }

  /**
   * delete user by its id
   * @param userId
   */
  async deleteUser(userId: number): Promise<void> {
    await User.destroy({
      where: {
        id: userId,
      },
    });
  }

  /**
   * update user data by its id
   * @param userId
   * @param dto
   * @returns
   */
  async updateUser(userId: number, dto: IUpdateUserDTO) {
    const [user] = await Promise.all([
      /** get user data */
      User.findByPk(userId, {
        rejectOnEmpty: new HttpException('User data not found.', 404),
      }),

      /** check timezone */
      Timezone.findOne({
        where: {
          name: dto.timezone,
        },

        rejectOnEmpty: new HttpException('Selected Timezone not valid.', 400),
      }),
    ]);

    return user.update(dto);
  }

  async getUsers(options?: { page?: number; offset?: number }) {
    return User.findAll({
      limit: 10,
      offset: 0,
    });
  }
}
