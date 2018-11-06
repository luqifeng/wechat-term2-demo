const DB = require('../utils/db.js')

module.exports = {
  /**
   * 拉取商品列表
   * 
   */

  home: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM comment join movies on comment.movie_id = movies.id ORDER BY RAND() LIMIT 1 ;")
  },

  movieList: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
  },

  myMovieList: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query("SELECT * FROM comment join movies on comment.movie_id = movies.id where comment.user = ?;",[user])
    
  },

  movieComments: async ctx => {
    
    let movieID = ctx.request.query.movie_id

    ctx.state.data = await DB.query("SELECT * FROM comment join movies on comment.movie_id = movies.id where comment.movie_id = ?;", [movieID])

  },

  movieDetail: async ctx => {
    let movieID = ctx.params.id

    //if (!isNaN(user)) {
    ctx.state.data = await DB.query("SELECT * FROM movies where id = ?;", [movieID])
    //} else {
    //  ctx.state.data = [user]
    //}

  },

  commentDetail: async ctx => {
    let commentID = ctx.params.id

    //if (!isNaN(user)) {
    ctx.state.data = await DB.query("SELECT * FROM comment where id = ?;", [commentID])
    //} else {
    //  ctx.state.data = [user]
    //}

  },


}