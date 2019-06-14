const Router = require('koa-router')()
const Article = require('./article.class')

Router.get('/', async (ctx, next) => {
  let result = await Article.findAll(ctx);
  ctx.body = result;
})

Router.get('/:id', async (ctx, next) => {
  let result = await Article.findById(ctx);
  ctx.body = result;
})

Router.post('/', async (ctx, next) => {
  let result = await Article.add(ctx);
  ctx.body = result;
})

Router.put('/', async (ctx, next) => {
  let result = await Article.update(ctx);
  ctx.body = result;
})

Router.delete('/:id', async (ctx, next) => {
  let result = await Article.delete(ctx);
  ctx.body = result;
})

module.exports = Router
