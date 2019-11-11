module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-cal' : '',
  outputDir: 'docs',
  chainWebpack: config => {
    config.plugins.delete('prefetch')

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.whitespace = 'preserve'
        return options
      })
  },
  productionSourceMap: false,
  devServer: {
    port: 8000
  }
}
