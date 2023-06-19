const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 设置为0.0.0.0则所有的地址均能访问
    host: '0.0.0.0',
    port: 8081,
    https: false,
    // 跨域问题解决 代理（关键部分）
    proxy: {
      '/api': {
        target: 'https://61.139.65.135:52482', // 注意！此处为后端提供的真实接口
        changeOrigin: true, // 允许跨域
        ws: true,
        pathRewrite: {
          // 如果接口中是没有api的，那就直接置空，'^/api': ''，
          // 如果接口中有api，那就得写成{'^/api':'/api'}
          '^/api': ''
        }
      }
    }
  }
})
