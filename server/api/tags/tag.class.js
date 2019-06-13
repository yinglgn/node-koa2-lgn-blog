const { Op, Tag } = require('../../models/index')
const TagModel = Tag;
const url = require('url')
const querystring = require('querystring')
const Util = require("../../utils/util.class")

class Tags {

  /**
   * 根据条件查询所有数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async findAll(ctx) {
    let query = url.parse(ctx.request.url).query
    let params = querystring.parse(query)
    let { currentPage = 1, size = 20 } = params
    let offset = (currentPage - 1) * size
    let obj = {
      limit: parseInt(size),
      offset: offset
    }
    if(params.name) {
      // 模糊查询
      obj.where = {
        name: {
          [Op.like]: `%${params.name}%`
        }
      }
    }
    let res = await TagModel.findAndCountAll(obj)
    
    return Util.ok_200(res)
  }

  /**
   * 根据id查询数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async findById(ctx) {
    let id = ctx.params.id
    let res = await TagModel.findByPk(id)
    if (!res) { return Util.error_404("数据不存在！") }

    return Util.ok_200(res)
  }

  /**
   * 新增数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async add(ctx) {
    let params = ctx.request.body
    let res = await TagModel.create(params)
    if (!res) { return Util.error_404("新增失败！") }

    return Util.ok_201()
  }

  /**
   * 修改数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async update(ctx) {
    let params = ctx.request.body
    let res = await TagModel.update(params, { where: { id: params.id } })
    if (!res) { return Util.error_404("修改失败！") }

    return Util.ok_202()
  }

  /**
   * 删除数据(物理删除)
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  static async delete(ctx) {
    let id = ctx.params.id;
    let res = await TagModel.destroy({ where: { id } });
    if (!res) { return Util.error_404("删除失败，该id数据不存在！") }

    return Util.ok_204();
  }
}

module.exports = Tags
