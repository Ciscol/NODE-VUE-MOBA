
const fs = require('fs')
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/style.scss";`
      }
    }
  }
}