const Router = require('koa-router')()
const Auth = require('../auth/routes')
const accounts = require('../api/accounts/routes')

Router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Koa 2!'
})

Router.use('/auth', Auth.routes(), Auth.allowedMethods())
Router.use('/accounts', accounts.routes(), accounts.allowedMethods())

module.exports = Router
