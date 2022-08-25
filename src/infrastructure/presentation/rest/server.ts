import Koa from 'koa';
import Router from 'koa-router';
import KoaBody from 'koa-body';
import cors from '@koa/cors';
import env from '../../../config/env';
import { countryController } from './controllers';

const app = new Koa();
const router = new Router();
app.use(cors({ origin: '*' }));
app.use(router.routes());
app.use(router.allowedMethods());

const koaBody = KoaBody({
  multipart: true,
  json: true,
  formLimit: parseInt(env.maxBodySize),
  textLimit: parseInt(env.maxBodySize),
  formidable: {
    maxFileSize: parseInt(env.maxBodySize)
  }
});

router.get('/api/v0/country', koaBody, countryController.getCountryByName);

export default app;