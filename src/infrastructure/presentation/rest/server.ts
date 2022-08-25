import Koa from 'koa';
import Router from 'koa-router';
import KoaBody from 'koa-body';
import cors from '@koa/cors';
import jwt from 'jsonwebtoken';
import { countryController, authController, slotController } from './controllers';

const app = new Koa();
const router = new Router();
app.use(cors({ origin: '*' }));
app.use(router.routes());
app.use(router.allowedMethods());

const koaBody = KoaBody({
  multipart: true,
  json: true,
  formLimit: 288358400,
  textLimit: 288358400,
  formidable: {
    maxFileSize: 288358400
  }
});

const authMiddleware: Koa.Middleware = async (ctx: Koa.Context, next: Koa.Next): Promise<any> => {
  const jwtSecretKey = '4bb4d5642f03470bb28078e6074bf4e4';

  try {
      const token = ctx.headers.authorization || '';
      const verified = jwt.verify(token, jwtSecretKey);
      if(verified){
        await next();
      }else{
        ctx.status = 401;
        ctx.body = {
          error: 'Access denied'
        };
        return ctx;
      }
  } catch (error) {
      ctx.status = 401;
      ctx.body = {
        error: error
      };
      return ctx;
  }
};

router.post('/api/v0/signup', koaBody, authController.signup);
router.post('/api/v0/signin', koaBody, authController.signin);

router.get('/api/v0/country', koaBody, authMiddleware, countryController.getCountryByName);

router.get('/api/v0/slot', koaBody, authMiddleware, slotController.spin);

export default app;