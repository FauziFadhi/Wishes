import db from '@config/database.config';
import bodyParser from 'body-parser';
import express from 'express';
import AllException from './src/utils/error';
import routes from './src/utils/route';

db.authenticate();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

/** routes */
routes(app);

app.use(AllException);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
