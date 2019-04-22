// vue.config.js
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, dir)
}

const BASE_URL = '/pbb'
module.exports = {
    baseUrl: BASE_URL,
    // 使用运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    // 开启生产环境SourceMap
    productionSourceMap: false,

    // 关闭ESLint
    lintOnSave: false,

    devServer: {
        disableHostCheck: true,
        open: false,        // 是否自动打开浏览器页面
        host: '0.0.0.0',    // 指定使用一个 host，默认是 localhost
        port: 80,         // 端口地址
        https: false,       // 使用https提供服务
        // 设置代理
        proxy: ''
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            config.module
            .rule('pdf')
            .test(/\.pdf$/)
            .use('file-loader')
            .loader('file-loader')
            .end()
    },

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    },
    css: {
        loaderOptions: {
            // sass: {
            //     data: `
            //     @import "@/style/mixin.scss";
            //     @import "@/style/var.scss";
            //     `
            // }
        }
    },
};
