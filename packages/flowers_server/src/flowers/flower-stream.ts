import Koa from 'koa';
import { PassThrough } from 'stream';
import { EventEmitter } from 'events';

const events = new EventEmitter();
events.setMaxListeners(0);

export function emitFlowerEvent(data: FlowerStatusEvent) {
    events.emit("flowerUpdate", `data: ${JSON.stringify(data)}\n\n`);
}

export async function flowerSSE(ctx: Koa.Context, next: Koa.Next) {
    if (ctx.path !== "/flowers/updates") {
        return await next();
    }
    ctx.request.socket.setTimeout(0);
    ctx.req.socket.setNoDelay(true);
    ctx.req.socket.setKeepAlive(true);

    ctx.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });

    const stream = new PassThrough();

    ctx.status = 200;
    ctx.body = stream;

    const listener = (data: string) => {
        console.log(data)
        stream.write(data);
    }
  
    events.on("flowerUpdate", listener);
  
    stream.on("close", () => {
        events.off("flowerUpdate", listener);
    });
}