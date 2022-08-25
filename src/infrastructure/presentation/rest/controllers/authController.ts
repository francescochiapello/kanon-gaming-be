import Koa from 'koa';
import jwt from 'jsonwebtoken';
import env from '../../../../config/env';
import database from '../../../database';
import md5 from 'md5';

export async function signup(ctx: Koa.Context) {
  try {
    const username = ctx.request.body.username as string;
    const password = ctx.request.body.password as string;

    database.insert({
      username,
      password: md5(password)
    });

    ctx.body = {
      success: true
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

export async function signin(ctx: Koa.Context) {
  try {
    const username = ctx.request.body.username as string;
    const password = ctx.request.body.password as string;

    let result: any;
    const find = new Promise((resolve) => {
      database.find({ username, password }, (err: any, docs: any) => {
        if (err) console.log(err);
        result = docs;
        resolve(docs);
      });
    });
    await Promise.all([find]);

    if (!result || result.length === 0) {
      ctx.status = 401;
      ctx.body = {
        error: 'Accedd denied'
      };
      return ctx;
    }

    const u = result[0].username;
    const p = result[0].password;

    if (u !== username && p !== password) {
      ctx.status = 401;
      ctx.body = {
        error: 'Accedd denied'
      };
      return ctx;
    }

    const jwtSecretKey = env.jwtSecretKey;
    const data = {
        time: Date(),
        userId: username
    };

    const token = jwt.sign(data, jwtSecretKey);

    ctx.body = {
      success: true,
      username,
      token
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
