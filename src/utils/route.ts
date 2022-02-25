import { TimezoneController } from 'src/controllers/timezone.controller';
import { UserController } from 'src/controllers/user.controller';
import { container } from 'tsyringe';

export default function (app: any) {
  const [userController] = container.resolveAll(UserController);
  const [timezoneController] = container.resolveAll(TimezoneController);
  app.use('/user', userController.routes());
  app.use('/timezone', timezoneController.routes());
}
