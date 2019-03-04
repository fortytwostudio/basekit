module.exports = {
  plugins: {
    cssnano: {
      minifySelectors: false
    },
    autoprefixer: {
      browsers: [ '> 0.5% in GB', 'last 3 versions', 'not ie 9' ]
    }
  }
}
