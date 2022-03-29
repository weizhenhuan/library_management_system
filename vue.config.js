'use strict'

const name = 'Book Management System' 
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack:{
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      require('unplugin-auto-import/webpack')({
        resolvers: [ElementPlusResolver()],
      }),
      require('unplugin-vue-components/webpack')({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack(config){

    //用于生成svg-sprite
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()



  }


}
