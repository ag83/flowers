import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mount from "koa-mount";
import path from "path";

import flowersRouter from './flowers/flower-routes';

const app = new Koa();


app.use(mount( '/public', serve(path.join(process.cwd(), 'public'))));

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    ctx.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers")
    await next();
});

app.use(bodyParser());
app.use(flowersRouter.routes());
app.use(flowersRouter.allowedMethods());

export default app;