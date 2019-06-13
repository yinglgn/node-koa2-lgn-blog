const Router = require('koa-router')()
const Tag = require('./tag.class')

Router.get('/', async (ctx, next) => {
  let result = await Tag.findAll(ctx);
  ctx.body = result;
})

Router.get('/:id', async (ctx, next) => {
  let result = await Tag.findById(ctx);
  ctx.body = result;
})

Router.post('/', async (ctx, next) => {
  let result = await Tag.add(ctx);
  ctx.body = result;
})

Router.put('/', async (ctx, next) => {
  let result = await Tag.update(ctx);
  ctx.body = result;
})

Router.delete('/:id', async (ctx, next) => {
  let result = await Tag.delete(ctx);
  ctx.body = result;
})

module.exports = Router
