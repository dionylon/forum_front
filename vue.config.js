module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    devServer: {
      open: false,
      host: 'localhost',
      port: '8080',
      proxy: {
        '/api': {
          target: 'http://localhost:8088',
          changeOrigin: true
        }
      }
    }
  }