import User from '@models/User';
import Wish, { ENUM_WISHES_TYPE } from '@models/Wish';
import moment from 'moment-timezone';
import { Op, Sequelize } from 'sequelize';
import { SendService } from 'src/middleware/hookbin/send.service';
import { autoInjectable } from 'tsyringe';
import WishQueue from '@models/WishQueue';
import {
  GenerateSendDateDTO,
  generateSendDateOptions,
} from './interface/wishes-service.interface';

@autoInjectable()
export class WishesService {
  constructor(private readonly sendService: SendService) {}

  /**
   * send birthday wishes
   * @param message
   */
  async sendBirthdayWish(message: string) {
    this.sendService.send(message);
  }

  /**
   * get list user that will receive wishes
   * @returns
   */
  async retrieveBirthdayWish() {
    return await User.findAll({
      attributes: [
        'id',
        'birthDate',
        'timezone',
        'firstName',
        'lastName',
        [Sequelize.literal('(now() at time zone "User"."timezone")'), 'datetz'],
      ],
      subQuery: false,
      where: {
        [Op.and]: [
          Sequelize.literal(
            `date(make_date(Extract(year from current_date)::int, Extract(month from "User"."birth_date")::int, Extract(day from "User"."birth_date")::int) at time zone "User"."timezone")
                    =
                    date(now() at time zone "User"."timezone")`,
          ),
          {
            [Op.or]: [
              {
                [Op.and]: [
                  {
                    '$wish.type$': ENUM_WISHES_TYPE.birthday,
                  },
                  Sequelize.literal(
                    '"wish"."last_wish" at time zone "User"."timezone" < date(now() at time zone "User"."timezone" - interval \'1 Year\') ',
                  ),
                ],
              },
              {
                '$wish.id$': null,
              },
            ],
          },
        ],
      },
      include: {
        association: 'wish',
        attributes: ['lastWish', 'id'],
        required: false,
      },
    });
  }

  /**
   * create or update wishes data with latest send wish
   * @param wish
   * @param dto
   * @returns
   */
  async createOrUpdateWish(
    wish: Wish | undefined,
    dto: { userId: number; sendDate: Date; type: ENUM_WISHES_TYPE },
  ) {
    const wishData = wish
      ? await wish.update({ lastWish: dto.sendDate })
      : await Wish.create({
          userId: dto.userId,
          lastWish: dto.sendDate,
          type: dto.type,
        });

    return wishData;
  }

  /**
   * generate send date wishes
   * @param dto
   * @param options
   * @returns
   */
  generateSendDate(dto: GenerateSendDateDTO, options: generateSendDateOptions) {
    return moment(dto.referenceDate, 'YYYY-MM-DD')
      .tz(dto.timezone)
      .set(options);
  }

  /**
   * create queue wishes
   * @param wishes
   * @param hours
   */
  async createBirthdayQueueWish(wishes: User[], hourAt: number) {
    const queue = await Promise.all(
      wishes.map(async (userWish) => {
        const timezoneYear = moment((userWish as any)['datetz']).format('YYYY');

        const sendDate = this.generateSendDate(
          {
            referenceDate: userWish.birthDate,
            timezone: userWish.timezone,
          },
          {
            year: +timezoneYear,
            hour: hourAt,
          },
        );

        const wish = await this.createOrUpdateWish(userWish.wish, {
          userId: userWish.id,
          sendDate: sendDate.toDate(),
          type: ENUM_WISHES_TYPE.birthday,
        });

        const name = `${userWish.firstName} ${userWish.lastName || ''}`.trim();

        return {
          wishId: +wish.id,
          sendAt: sendDate.toDate(),
          payload: `Hey, ${name} it's your birthday`,
        };
      }),
    );

    await WishQueue.bulkCreate(queue);
  }
}
