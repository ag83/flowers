import Koa from 'koa';
import Router from 'koa-router';
import HttpStatus from 'http-status-codes';

import flowerService from './flower-service';

const routerOpts: Router.IRouterOptions = {
  prefix: '/flowers',
};


const flowersRouter: Router = new Router(routerOpts);

flowersRouter.get('/', async (ctx:Koa.Context) => {
  const flowers = await flowerService.getFlowers();
  ctx.body = flowers;
});

flowersRouter.post('/', async (ctx:Koa.Context) => {
  const flowerRequest = ctx.request.body as FlowerInfoCreateRequest;
  if (!flowerService.validateFlowerRequest(flowerRequest)) {
    ctx.body = {message: 'wrong input format'};
    ctx.throw(HttpStatus.BAD_REQUEST);
  }
  const newFlower = await flowerService.saveFlower(flowerRequest);
  ctx.body = newFlower;

});

flowersRouter.get('/:id/status', async (ctx:Koa.Context) => {
  const id = ctx.params.id;
  const flowerStatus = await flowerService.getFlowerStatus(id);
  ctx.body = flowerStatus;
});

flowersRouter.patch('/:id/status', async (ctx:Koa.Context) => {
  const id = ctx.params.id;
  const update = ctx.request.body as FlowerStatus;
  if (!flowerService.validateFlowerStatus(update)) {
    ctx.body = {message: 'wrong input format'};
    ctx.throw(HttpStatus.BAD_REQUEST);
  }
  const updatedFlower = await flowerService.patchFlowerStatus(id, update);
  ctx.body = updatedFlower;
});

flowersRouter.patch('/status', async (ctx:Koa.Context) => {
  const update = ctx.request.body as DeliveryUpdate;
  if (!flowerService.validateFlowerUpdate(update)) {
    ctx.body = {message: 'wrong input format'};
    ctx.throw(HttpStatus.BAD_REQUEST);
  }
  const updatedFlower = await flowerService.updateFlowerStatus(update);
  ctx.body = updatedFlower;
});

export default flowersRouter;