
module.exports = {
    publicPath: "./",
    

    outputDir: "mycli3",

    assetsDir: "assets",

    filenameHashing: false,
    

    lintOnSave: true,

    productionSourceMap: false,
    

    devServer: {

        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/'
                }
            }
        },
        https: false,
        open: true,

    }
}
