const jwt = require('jsonwebtoken')
const config = require('../config/config')

const Auth = {
  signToken(data) {
    return jwt.sign(data, config.session.secrets, { expiresIn: config.session.expiresIn })
  },
  verify(token) {
    const _userToken = token.split(' ')[1];//token中还有其他信息
    return jwt.verify(_userToken, config.session.secrets);//解密userToken
  },
  verification() {
    return async (ctx, next) => {
      try {
        // 获取jwt
        const token = ctx.header.authorization; 
        if (token) {
          try {
            // 解密payload，获取用户名和ID
            let accounts = Auth.verify(token);
            ctx.account = {
              id: accounts.id
            }
          } catch(err) {}
        }
        await next();
      } catch (err) {
        if (401 == err.status) {
          ctx.status = 401;
          ctx.body = 'No permission, please login\n';
        } else {
          throw err;
        }
      }
    }
  }
}

module.exports = Auth