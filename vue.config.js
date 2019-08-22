const path = require('path')
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  },
  devServer: {
    port: 8002,
    proxy: {
      '/oy/api': {
        target: 'http://127.0.0.1:2222',  // target host
        // ws: true,  // proxy websockets 
        // changeOrigin: true,  // needed for virtual hosted sites
        // pathRewrite: {
        //     '^/apis': ''  // rewrite path
        // }
      },
    }
  },
};
