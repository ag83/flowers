import Koa from 'koa';
import Router from 'koa-router';

const routerOpts: Router.IRouterOptions = {
  prefix: '/flowers',
};

const flowersRouter: Router = new Router(routerOpts);

flowersRouter.get('/', async (ctx:Koa.Context) => {
  
});

flowersRouter.post('/', async (ctx:Koa.Context) => {
 
});

flowersRouter.get('/:id/status', async (ctx:Koa.Context) => {

});

flowersRouter.patch('/:id', async (ctx:Koa.Context) => {

});

export default flowersRouter;