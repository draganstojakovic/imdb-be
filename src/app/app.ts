import express from 'express';
import session from 'express-session';
import cors from 'cors';
import router from 'routes/Router';
import { COOKIE_SECRET, SESSION } from 'constants/envVars';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.set('trust proxy', 1);
  app.use(
    cors({
      credentials: true,
      methods: ['POST', 'GET', 'PUT'],
    })
  );

  app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: COOKIE_SECRET,
      cookie: { maxAge: SESSION },
    })
  );

  app.use('/api', router);

  return app;
};

export default createApp;