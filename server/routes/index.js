const Router = require('koa-router')()
const Auth = require('../auth/routes')
const accounts = require('../api/accounts/routes')
const categorys = require('../api/categorys/routes')
const tags = require('../api/tags/routes')

Router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Koa 2!'
})

Router.use('/auth', Auth.routes(), Auth.allowedMethods())
Router.use('/accounts', accounts.routes(), accounts.allowedMethods())
Router.use('/categorys', categorys.routes(), categorys.allowedMethods())
Router.use('/tags', tags.routes(), tags.allowedMethods())

module.exports = Router
