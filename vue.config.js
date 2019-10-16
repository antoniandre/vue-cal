module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-cal' : '',
  outputDir: 'docs',
  chainWebpack: config => config.plugins.delete('prefetch'),
  productionSourceMap: false,
  devServer: {
    port: 8000
  }
}
