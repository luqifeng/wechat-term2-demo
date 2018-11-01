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
    let userID = ctx.request.query.product_id

    if (!isNaN(productId)) {
      ctx.state.data = await DB.query("SELECT * FROM comment join in movies on comment.movie_id = movies.id where comment.user =;")
    } else {
      ctx.state.data = []
    }
    
  }


}