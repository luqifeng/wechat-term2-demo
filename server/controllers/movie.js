const DB = require('../utils/db.js')

module.exports = {
  /**
   * 拉取商品列表
   * 
   */

  home: async ctx => {
    ctx.state.data = await DB.query("SELECT *,comment.id as comment_id FROM comment join movies on comment.movie_id = movies.id ORDER BY RAND() LIMIT 1 ;")
  },

  movieList: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
  },

  myMovieList: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query("SELECT * FROM comment join movies on comment.movie_id = movies.id left join collections on comment.id = collections.comment_id  where comment.user = ? or collections.user = ?;",[user,user])
    
  },

  myCommentList: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query("SELECT * FROM comment join movies on comment.movie_id = movies.id  where comment.user = ?;", [user])

  },

  myCollectionList: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query("SELECT * FROM comment join movies on comment.movie_id = movies.id join collections on comment.id = collections.comment_id  where collections.user = ?;", [user])

  },

  movieComments: async ctx => {
    
    let movieID = ctx.request.query.movie_id

    ctx.state.data = await DB.query("SELECT * FROM comment where comment.movie_id = ?;", [movieID])

  },

  movieDetail: async ctx => {
    let movieID = ctx.params.id

    //if (!isNaN(user)) {
    ctx.state.data = await DB.query("SELECT * FROM movies where id = ?;", [movieID])
    //} else {
    //  ctx.state.data = [user]
    //}

  },

  addCollection: async ctx => {
    let commentID = ctx.params.id
    let user = ctx.state.$wxInfo.userinfo.openId

    await DB.query('INSERT INTO collections(user,comment_id ) VALUES (?, ?)', [user, commentID])

    //if (!isNaN(user)) {
    ctx.state.data = await DB.query("SELECT * FROM movies where id = ?;", [commentID])
    //} else {
    //  ctx.state.data = [user]
    //}

  },

  commentDetail: async ctx => {
    let commentID = ctx.params.id

    //if (!isNaN(user)) {
    ctx.state.data = await DB.query("SELECT *,comment.id as comment_id FROM comment join movies on comment.movie_id = movies.id where comment.id = ?;", [commentID])
    //} else {
    //  ctx.state.data = [user]
    //}

  },

  checkMyComment: async ctx => {
    let movieID = ctx.params.id
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query("SELECT *, comment.id as comment_id FROM comment join movies on comment.movie_id = movies.id  where movies.id = ? and comment.user = ?;", [movieID ,user])
  },

  checkMyCollection: async ctx => {
    let commentID = ctx.params.id
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query("SELECT * FROM collections where comment_id = ? and user= ?;", [commentID, user])
  },


}