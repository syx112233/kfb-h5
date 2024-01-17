import type { UserConfigExport } from "@tarojs/cli";
export default {
   logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {
    router: {},
    devServer: {
      host: 'localhost',
      port: 10086,
      proxy: {
        '/api': {
          target: 'http://47.106.188.14',
          changeOrigin: true,
          pathRewrite: {
            '^/api/': '/'
          },
        }
      }
    }
  }
} satisfies UserConfigExport
