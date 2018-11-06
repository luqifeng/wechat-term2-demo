const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx798c289d81b932cd',

    // 微信小程序 App Secret
    appSecret: 'fa27350c8e7a6a2fd093c0d44cd3435c',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    qcloudAppId: '1251366251',
    qcloudSecretId: 'AKID2CKI4L8kvyQjaMNb1LUVL0HXfgEb3mgV',
    qcloudSecretKey: 'Wt8D661mfT9gMySluxqtcpxvhHkU9ez9',

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wx798c289d81b932cd',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'movie',
        // 文件夹
        uploadFolder: 'audios',
        mimetypes:['audio/x-acc','audio/mpeg','audio/mp3','audio/m4a','video/webm']
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
