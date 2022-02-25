import { ENUM_WISHES_TYPE } from '@models/Wish';
import WishQueue from '@models/WishQueue';
import { BIRTHDAY_WISH_HOUR } from '@utils/constant';
import moment from 'moment';
import { Op } from 'sequelize';
import { SendService } from 'src/middleware/hookbin/send.service';
import { autoInjectable } from 'tsyringe';
import { WishesService } from './wishes.service';

@autoInjectable()
export class CronService {
  constructor(
    private readonly sendService: SendService,
    private readonly wishService: WishesService,
  ) {}

  /**
   * send queue wishes
   */
  async sendQueue() {
    const minTime = moment(new Date(), 'YYYY-MM-DD').startOf('hour');
    const maxTime = minTime.clone().add(1, 'hour');
    const queues = await WishQueue.findAll({
      limit: 100,
      where: {
        isSent: false,
        sendAt: {
          [Op.or]: [
            { [Op.gte]: minTime.toDate(), [Op.lt]: maxTime.toDate() },
            {
              [Op.gte]: minTime.clone().subtract(1, 'day').toDate(),
              [Op.lt]: maxTime.clone().subtract(1, 'day').toDate(),
            },
          ],
        },
      },
    });

    Promise.all(
      queues.map(async (queue) => {
        await this.sendService.send(queue.payload);
        queue.update({
          isSent: true,
          sentAt: new Date(),
        });
      }),
    );
  }

  /**
   * retrieve list of user that has birthday and pending today.
   * and store it to queue.
   */
  async addBirthdayWishToQueue(): Promise<void> {
    const incomingBirthdayWishes =
      await this.wishService.retrieveBirthdayWish();
    await this.wishService.createBirthdayQueueWish(
      incomingBirthdayWishes,
      BIRTHDAY_WISH_HOUR,
    );
  }
}
