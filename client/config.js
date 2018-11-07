/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://740832986.lqf.name';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        //电影首页
        movieHome: `${host}/weapp/movieHome`,

        //我的电影
        myMovieList: `${host}/weapp/myMovieList`,

        //热门电影
        movieList: `${host}/weapp/movieList`,

        //电影评价
        movieComments: `${host}/weapp/movieComments`,

        //电影细节
        movieDetail: `${host}/weapp/movieDetail/`,

        //评价细节
        commentDetail: `${host}/weapp/commentDetail/`,

        //收藏评论
        addCollections: `${host}/weapp/addCollection/`,

        //检查我的评论
        checkMyComment: `${host}/weapp/checkMyComment/`,

        //检查我的收藏
        checkMyCollection: `${host}/weapp/checkMyCollection/`,

          //获取我的收藏
        myCollectionList: `${host}/weapp/myCollectionList/`,

          //获取我的评价
        myCommentList: `${host}/weapp/myCommentList/`,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 拉取商品列表
        productList: `${host}/weapp/product`,

        // 拉取商品详情
        productDetail: `${host}/weapp/product/`,

        // 拉取用户信息
        user: `${host}/weapp/user`,

        // 创建订单
        addOrder: `${host}/weapp/order`,

        // 获取已购买订单列表
        orderList: `${host}/weapp/order`,

        // 添加到购物车商品列表
        addTrolley: `${host}/weapp/trolley`,

        // 获取购物车商品列表
        trolleyList: `${host}/weapp/trolley`,

        // 更新购物车商品列表
        updateTrolley: `${host}/weapp/trolley`,

        // 添加评论
        addComment: `${host}/weapp/comment`,
        
        // 获取评论列表
        commentList: `${host}/weapp/comment`,

    }
};

module.exports = config;
