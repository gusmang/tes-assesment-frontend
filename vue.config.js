module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? ''
  //   : '/',
  publicPath: '',
  devServer: {
    proxy: 'https://yukbelajar.com'
  }
}
