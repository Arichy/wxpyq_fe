module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: {
            // '/api':{
            //     target:'http://localhost:5000/api/',
            //     ws:true,
            //     changeOrigin:true,
            //     pathRewrite:{
            //         "^/api":""
            //     }
            // }
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
            }
        }
    }
}