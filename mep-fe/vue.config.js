module.exports = {
  publicPath: './',
  devServer: {
      open: true, //浏览器自动打开页面
      host: "localhost", //如果是真机测试，就使用这个IP
      port: 8080,
      https: true,
      hotOnly: false, //热更新（webpack已实现了，这里false即可）
      proxy: {
          //配置跨域-将所有/api的请求拦截，代理到target上
          '/api': {
              target: "https://119.8.47.5:30448",
              changOrigin:true,
              pathRewrite:{ //---->>>并将/api换成/
                  '^/api':'' 
              }
          }
      }
  }
}