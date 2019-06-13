const Router = require('koa-router')()
const AccountInfo = require('../api/accounts/account.class')

Router.post('/login', async (ctx, next) => {
  let result = await AccountInfo.login(ctx);
  ctx.body = result;
})

module.exports = Router