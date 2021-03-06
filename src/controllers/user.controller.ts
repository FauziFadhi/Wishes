import { Request, Response, Router } from 'express';
import { UserService } from 'src/services/user.service';
import { transformer } from 'src/utils/helpers';
import { autoInjectable } from 'tsyringe';
import { ControllerBase } from './interface/controller.base';
import { UserVm } from './viewmodel/user.viewmodel';
import validation from '@utils/middleware/validation.middleware';
import AuthGuard from '@utils/middleware/auth.middleware';
import UserGuard from '@utils/middleware/auth-access.middleware';
import { UserCreateRequest, UserUpdateRequest } from './request/user.request';

@autoInjectable()
export class UserController implements ControllerBase {
  private router!: Router;
  constructor(private readonly service: UserService) {
    this.router = Router();
  }
  routes() {
    this.router.get('/', async (req: Request, res: Response) => {
      res.send(await this.getUsers(req));
    });

    this.router.post(
      '/',
      validation(UserCreateRequest),
      async (req: Request, res: Response) => {
        res.send(await this.createUser(req));
      },
    );

    this.router.delete('/:id', async (req: Request, res: Response) => {
      res.send(await this.deleteUser(req));
    });

    this.router.put(
      '/:id',
      [AuthGuard, UserGuard, validation(UserUpdateRequest)],
      async (req: Request, res: Response) => {
        res.send(await this.updateUser(req));
      },
    );

    return this.router;
  }

  async getUsers({ query }: Request) {
    const size = query.size ? +query.size : 10;
    const page = query.page ? +query.page : 1;
    const offset = (page - 1) * size || 0;
    const resp = await this.service.getUsers({ offset, size });
    return transformer(UserVm, resp);
  }

  async createUser({ body }: Request) {
    const resp = await this.service.createUser(body);
    return transformer(UserVm, resp);
  }

  async deleteUser({ params }: Request) {
    await this.service.deleteUser(+params.id);
    return;
  }

  async updateUser({ params, body }: Request) {
    const resp = await this.service.updateUser(+params.id, body);
    return transformer(UserVm, resp);
  }
}
