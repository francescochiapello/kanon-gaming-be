import Koa from 'koa';
import useCases from '../../../../core/application';

export async function getCountryByName(ctx: Koa.Context) {
  try {
    const name = ctx.query.name;
    if (!name) throw new Error('Invalid country name');

    let result;
    if (Array.isArray(name)) {
      for (const n of name) {
        if (!/^[a-z]+$/.test(n)) throw new Error('Invalid characters in country name');
      }
      result = await useCases.getCountriesByPartialName(name);
    } else {
      if (!/^[a-z]+$/.test(name)) throw new Error('Invalid characters in country name');
      result = await useCases.getCountryByName(name);
    }

    ctx.body = {
      success: true,
      result
    };
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
