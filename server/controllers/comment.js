const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    
    let movie_id = +ctx.request.body.movie_id
    let content = ctx.request.body.content || null
    
    let record = ctx.request.body.record || []
    //images = images.join(';;')


    if (!isNaN(productId)) {
      await DB.query('INSERT INTO comment(user, username, avatar, content, record, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, record, movie_id])
    }

    ctx.state.data = {}
  },

  /**
   * 获取评论列表
   */
  list: async ctx => {
    let movie_id = +ctx.request.query.movie_id
    
    if (!isNaN(productId)) {
      ctx.state.data = await DB.query('select * from comment where comment.movie_id = ?', [movie_id])
    } else {
      ctx.state.data = []
    }
  },
}