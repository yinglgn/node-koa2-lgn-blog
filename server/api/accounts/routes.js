const router = require('koa-router')()
const Account = require('./account.class')

router.get('/', async (ctx, next) => {
  let result = await Account.findAll(ctx);
  ctx.body = result;
})

router.get('/oneself', async (ctx, next) => {
  let result = await Account.findOneself(ctx);
  ctx.body = result;
})

router.get('/:id', async (ctx, next) => {
  let result = await Account.findById(ctx);
  ctx.body = result;
})

router.put('/:id', async (ctx, next) => {
  let result = await Account.update(ctx);
  ctx.body = result;
})

router.delete('/:id', async (ctx, next) => {
  let result = await Account.delete(ctx);
  ctx.body = result;
})

module.exports = router
