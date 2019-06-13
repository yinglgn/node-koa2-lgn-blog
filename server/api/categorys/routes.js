const Router = require('koa-router')()
const Category = require('./category.class')

Router.get('/', async (ctx, next) => {
  let result = await Category.findAll(ctx);
  ctx.body = result;
})

Router.get('/:id', async (ctx, next) => {
  let result = await Category.findById(ctx);
  ctx.body = result;
})

Router.post('/', async (ctx, next) => {
  let result = await Category.add(ctx);
  ctx.body = result;
})

Router.put('/', async (ctx, next) => {
  let result = await Category.update(ctx);
  ctx.body = result;
})

Router.delete('/:id', async (ctx, next) => {
  let result = await Category.delete(ctx);
  ctx.body = result;
})

module.exports = Router
