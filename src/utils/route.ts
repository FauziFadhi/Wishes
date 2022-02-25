import { UserController } from 'src/controllers/user.controller';
import { container } from 'tsyringe';

export default function (app: any) {
  const [userController] = container.resolveAll(UserController);
  app.use('/user', userController.routes());
}
