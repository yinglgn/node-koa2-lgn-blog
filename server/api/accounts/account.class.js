const AccountModel = require('../../models/index').User
const Util = require("../../utils/util.class")
const md5 = require("md5")
const Auth = require('../../auth/index')
const url = require('url')
const querystring = require('querystring')

const query = { status: 1 }

class Account {
  /**
   * 登录
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async login(ctx) {
    let { username, password } = ctx.request.body
    if (!username || !password) { return Util.error_404("登录名或密码不能为空！") }
    let res = await AccountModel.findOne({
      where: { username, ...query },
      attributes: ['id', 'username', 'password', 'real_name']
    })
    if (!res) { return Util.error_404("该用户不存在，请注册！") }
    if (res.username != username || res.password != md5(password)) {
      return Util.error_404("用户名或者密码错误，请重新输入！")
    }
    const account = {
      id: res.id,
      real_name: res.real_name
    }
    const access_token = Auth.signToken(account)
    return Util.ok_201({ ...account, access_token }, '登录成功!')
  }

  /**
   * 注册
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async register(ctx) {
    let from = ctx.request.body;
    const args = {
      username: from.username,
      password: md5(from.password),
      real_name: from.real_name,
      email: from.email
    }
    if (!args.username || !args.password) {
      return Util.error_404("登录名和密码不能为空！")
    }
    let count = await AccountModel.count({
      where: { username: args.username }
    })
    if (count > 0) { return Util.error_404("该用户已存在，请登录！") }
    let res = await AccountModel.create(args);
    if (res.insertId <= 0) { return Util.error_404("注册失败！") }

    return Util.ok_201(res, '注册成功！')
  }

  /**
   * 根据条件查询所有数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async findAll(ctx) {
    let query = url.parse(ctx.request.url).query;
    let params = querystring.parse(query);
    let { currentPage = 1, size = 20 } = params;
    let offset = (currentPage - 1) * size;
    let res = await AccountModel.findAndCountAll({
      where: query,
      limit: parseInt(size),
      offset: offset,
      attributes: { exclude: ["password"] },
    })
    return Util.ok_200(res)
  }

  /**
   * 根据当前用户获取信息
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async findOneself(ctx) {
    let id = ctx.account.id;
    let res = await AccountModel.findOne({
      where: { id, ...query },
      attributes: { exclude: ["password"] }
    })
    if(!res) { ctx.throw(401) }

    return Util.ok_200(res)
  }

  /**
   * 根据id获取信息
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async findById(ctx) {
    let id = ctx.params.id;
    let res = await AccountModel.findOne({
      where: { id, ...query },
      attributes: { exclude: ["password"] }
    })
    if (!res) { return Util.error_404("没有该用户信息！") }

    return Util.ok_200(res)
  }

  /**
   * 修改数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async update(ctx) {
    let id = ctx.params.id;
    let result = await AccountModel.findOne({ where: { id, ...query } })
    if (!result) { return Util.error_404("该数据不存在！") }
    let params = ctx.request.body;
    let res = await AccountModel.update(params, { where: { id } })
    if (!res) { return Util.error_404("修改失败！") }

    return Util.ok_202()
  }

  /**
   * 删除数据(逻辑删除)
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async delete(ctx) {
    let id = ctx.params.id;
    let result = await AccountModel.findOne({ where: { id, status: 1 } })
    if (!result) { return Util.error_404("该数据不存在！") }
    let params = { status: 0 }
    let res = await AccountModel.update(params, { where: { id } })
    if (!res) { return Util.error_404("删除失败！") }

    return Util.ok_204()
  }

}

module.exports = Account;
