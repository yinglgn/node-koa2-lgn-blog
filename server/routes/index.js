const Router = require('koa-router')()

Router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Koa 2!'
})

// Router.use('/users',users.routes(),users.allowedMethods())

module.exports = Router
