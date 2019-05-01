module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/ReaderPrototype/' : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  }
};
