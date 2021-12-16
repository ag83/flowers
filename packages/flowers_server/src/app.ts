import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import cors from 'koa-cors';

import flowersRouter from './flowers/flower-routes';

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(serve('../public'));

app.use(flowersRouter.routes());
app.use(flowersRouter.allowedMethods());

export default app;