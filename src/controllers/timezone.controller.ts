import { Request, Response, Router } from 'express';
import { transformer } from 'src/utils/helpers';
import { autoInjectable } from 'tsyringe';
import { ControllerBase } from './interface/controller.base';
import { TimezoneService } from 'src/services/timezone.service';
import { TimezoneVm } from './viewmodel/timezone.viewmodel';

@autoInjectable()
export class TimezoneController implements ControllerBase {
  private router!: Router;
  constructor(private readonly service: TimezoneService) {
    this.router = Router();
  }
  routes() {
    this.router.get('/', async (req: Request, res: Response) => {
      res.send(await this.getUsers(req));
    });

    return this.router;
  }

  async getUsers({ query }: Request) {
    const resp = await this.service.timezones();
    return transformer(TimezoneVm, resp);
  }
}
