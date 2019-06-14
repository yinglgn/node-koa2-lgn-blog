const Router = require('koa-router')()
const Auth = require('../auth/routes')
const accounts = require('../api/accounts/routes')
const categorys = require('../api/categorys/routes')
const tags = require('../api/tags/routes')
const articles = require('../api/articles/routes')

Router.prefix('/api')
Router.use('/auth', Auth.routes(), Auth.allowedMethods())
Router.use('/accounts', accounts.routes(), accounts.allowedMethods())
Router.use('/categorys', categorys.routes(), categorys.allowedMethods())
Router.use('/tags', tags.routes(), tags.allowedMethods())
Router.use('/articles', articles.routes(), articles.allowedMethods())

module.exports = Router
