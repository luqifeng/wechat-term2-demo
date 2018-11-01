const DB = require('../utils/db.js')

module.exports = {
  /**
   * 拉取商品列表
   * 
   */

  home: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies ORDER BY RAND() LIMIT 1 ;")
  },


}