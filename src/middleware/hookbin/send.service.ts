import HttpException from '@utils/http-exception';
import axios from 'axios';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class SendService {
  private endpoint: string;
  constructor() {
    this.endpoint = process.env.HOOKBIN_ENDPOINT || '';
  }

  async send(message: string) {
    const resp = await axios
      .post(this.endpoint, JSON.stringify(message), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((e) => {
        throw new HttpException(e, 500);
      });

    console.log(resp.data);
    return resp.data;
  }
}
