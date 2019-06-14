const { Op, Transaction, Article, User, Category, Tag } = require('../../models/index')
const ArticleModel = Article;
const url = require('url')
const querystring = require('querystring')
const marked = require('marked')
const Util = require("../../utils/util.class")

//关联数据查询
const includes = [
  {
    model: User,
    attributes: ['id', 'real_name', 'avator']
  },
  {
    model: Category,
    attributes: ['id', 'name']
  },
  {
    model: Tag,
    attributes: ['id', 'name']
  }
]

class Articles {

  /**
   * 根据条件查询所有数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async findAll(ctx) {
    let query = url.parse(ctx.request.url).query;
    let params = querystring.parse(query);
    let { page = 1, size = 20, status = 1, is_markdown = false} = params;
    let obj = {
      limit: parseInt(size),
      offset: (page - 1) * size,
      include: includes,
      where: { status },
      distinct: true, //一个文章有多个tag，避免count不准确
    }
    if(params.title) {
      // 模糊查询
      obj.where.title = {
        [Op.like]: `%${params.title}%`
      }
    }
    let res = await ArticleModel.findAndCountAll(obj);
    
    return Util.ok_200(res)
  }

  /**
   * 根据id查询数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async findById(ctx) {
    let id = ctx.params.id;
    let res = await ArticleModel.findOne({
      include: includes,
      where: { id, status: 1 }
    })
    if (!res) { return Util.error_404("数据不存在！") }

    return Util.ok_200(res)
  }

  /**
   * 新增数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async add(ctx) {
    let params = ctx.request.body;
    params.user_id = ctx.account.id;
    params.content = marked(params.markdown_content);
    //新增文章后返回数据，需要id
    let res = await Transaction( async (t) => {
      let result = await ArticleModel.create(params, {
        transaction: t
      })
      await result.addTags(params.tags, {
        transaction: t
      })
    })

    if (!res) { return Util.error_404("新增失败！") }

    return Util.ok_201()
  }

  /**
   * 修改数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async update(ctx) {
    let params = ctx.request.body;
    let res = await ArticleModel.findByPk(params.id)
    if (!res) { return Util.error_404("该id数据不存在！") }

    let result = await Transaction( async (t) => {
      await ArticleModel.update(params, {
        where: { id: params.id },
        transaction: t
      })
      await res.setTags(params.tags, {
        transaction: t
      })
    })
    if (!result) { return Util.error_404("修改失败！") }

    return Util.ok_202()
  }

  /**
   * 删除数据(物理删除)
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async delete(ctx) {
    let id = ctx.params.id;
    let result = await ArticleModel.findOne({ where: { id, is_delete: 0 } })
    if (!result) { return Util.error_404("该数据不存在！") }
    let params = { is_delete: 1 }
    let res = await ArticleModel.update(params, { where: { id } })
    if (!res) { return Util.error_404("删除失败！") }

    return Util.ok_204();
  }
}

module.exports = Articles
