module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '猜无机化合物游戏'
      return args
    })
  },
}
