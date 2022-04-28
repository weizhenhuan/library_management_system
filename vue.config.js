"use strict"

const name = "Book Management System"
const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
module.exports = {
  publicPath: "/app",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    plugins: [
      require("unplugin-auto-import/webpack")({
        resolvers: [ElementPlusResolver({ importStyle: false })]
      }),
      require("unplugin-vue-components/webpack")({
        resolvers: [ElementPlusResolver()]
      }),
      require("unplugin-element-plus/webpack")({
        // options
      })
    ]
  },
  chainWebpack(config) {
    // 用于生成svg-sprite
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()

    config
      .when(process.env.NODE_ENV !== "development",

        config => {
          config
            .plugin("webpack-bundle-analyzer")
            .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          config
            .optimization.splitChunks({
              chunks: "all",
              cacheGroups: {
                libs: {
                  name: "chunk-libs",
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: "initial" // only package third parties that are initially dependent
                },
                elementPlus: {
                  name: "chunk-elementPlus", // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/].*element-plus(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: "chunk-commons",
                  test: resolve("src/components"), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
            // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk("single")
        }
      )
  }

}
