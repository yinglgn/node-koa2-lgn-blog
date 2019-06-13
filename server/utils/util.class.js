class Util {

  static message(code, msg, data) {
    return { code, msg, data }
  }

  static ok_200(data = null, msg = '请求成功', code = 200 ) {
    return Util.message(code, msg, data)
  }

  static ok_201(data = null, msg = '创建成功', code = 201 ) {
    return Util.message(code, msg, data)
  }

  static ok_202(data = null, msg = '修改成功', code = 202 ) {
    return Util.message(code, msg, data)
  }

  static ok_204(data = null, msg = '删除成功', code = 204 ) {
    return Util.message(code, msg, data)
  }

  static error_404(msg = '请求失败', data = null, code = 404 ) {
    return Util.message(code, msg, data)
  }
}
module.exports = Util
