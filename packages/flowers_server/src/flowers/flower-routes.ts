import Koa from 'koa';
import Router from 'koa-router';
import HttpStatus from 'http-status-codes';

import flowerService from './flower-service';
import { emitFlowerEvent } from './flower-stream';

const routerOpts: Router.IRouterOptions = {
    prefix: '/flowers',
};


const flowersRouter: Router = new Router(routerOpts);

flowersRouter.get('/', async (ctx:Koa.Context, next: Koa.Next) => {
    try {
        const flowers = await flowerService.getFlowers();
        ctx.body = flowers;
    } catch(err) {
        console.error(err)
        ctx.body = {message: 'server error'};
        ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    await next();
});

flowersRouter.post('/', async (ctx:Koa.Context, next: Koa.Next) => {
    const flowerRequest = ctx.request.body as FlowerInfoCreateRequest;
    if (!flowerService.validateFlowerRequest(flowerRequest)) {
        ctx.body = {message: 'wrong input format'};
        ctx.throw(HttpStatus.BAD_REQUEST);
    }
    try {
        const newFlower = await flowerService.saveFlower(flowerRequest);
        ctx.body = newFlower;
    } catch(err) {
        console.error(err)
        ctx.body = {message: 'server error'};
        ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    await next();
});

flowersRouter.get('/:id/status', async (ctx:Koa.Context, next: Koa.Next) => {
    const id = parseInt(ctx.params.id);
    try {
        const flowerStatus = await flowerService.getFlowerStatus(id);
        ctx.body = flowerStatus;
    } catch(err) {
        console.error(err)
        ctx.body = {message: 'server error'};
        ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    await next();
});

flowersRouter.patch('/:id/status', async (ctx:Koa.Context, next: Koa.Next) => { // client update endpoint
    const id = parseInt(ctx.params.id);
    const update = ctx.request.body as FlowerStatusUpdate;
    if (!flowerService.validateFlowerStatus(update)) {
        ctx.body = {message: 'wrong input format'};
        ctx.throw(HttpStatus.BAD_REQUEST);
    }
    try {
        const updatedFlower = await flowerService.patchFlowerStatus(id, update);
        ctx.body = updatedFlower;
    } catch(err) {
        console.error(err)
        ctx.body = {message: 'server error'};
        ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    await next();
});

flowersRouter.patch('/status', async (ctx:Koa.Context, next: Koa.Next) => { // provider update endpoint
    const update = ctx.request.body as DeliveryUpdate;
    if (!flowerService.validateFlowerUpdate(update)) {
        ctx.body = {message: 'wrong input format'};
        ctx.throw(HttpStatus.BAD_REQUEST);
    }
    try {
        const updatedFlower = await flowerService.updateFlowerStatus(update);
        const flowerUpdateEvent = {
            flowerId: updatedFlower.flowerId,
            stockLevel: updatedFlower.stockLevel,
            status: updatedFlower.status
        }
        emitFlowerEvent(flowerUpdateEvent);
        ctx.body = updatedFlower;
    } catch(err) {
        console.error(err)
        ctx.body = {message: 'server error'};
        ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    await next();
});

export default flowersRouter;