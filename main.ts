import db from '@config/database.config';
import bodyParser from 'body-parser';
import express from 'express';
import AllException from './src/utils/error';
import routes from './src/utils/route';
import * as cron from 'node-cron';
import { container } from 'tsyringe';
import { CronService } from 'src/services/cron.service';

db.authenticate();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

/** routes */
routes(app);

const cronService = container.resolve(CronService);
cron.schedule('* * * * *', () => {
  cronService.sendQueue();
});

cron.schedule('*/15 * * * *', () => {
  cronService.addBirthdayWishToQueue();
});

app.use(AllException);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
