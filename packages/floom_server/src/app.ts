import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import flowersRouter from './flowers/flower-routes';

const app = new Koa();

app.use(bodyParser());

app.use(flowersRouter.routes());
app.use(flowersRouter.allowedMethods());

app.on('error', console.error);

export default app;