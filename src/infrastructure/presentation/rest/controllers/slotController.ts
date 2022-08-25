import Koa from 'koa';
import spinSlotMachine from '../../../../core/application/spinSlotMachine';

export async function spin(ctx: Koa.Context) {
  try {
    const result = spinSlotMachine();

    ctx.body = result;
    return ctx;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      error: error.message
    };
    return ctx;
  }
}