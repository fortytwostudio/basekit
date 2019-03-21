module.exports = {
  plugins: {
    cssDeclarationSorter: {
      order: 'alphabetically'
    },
    cssnano: {
      minifySelectors: false
    },
    autoprefixer: {
      browsers: [ '> 0.5% in GB', 'last 3 versions', 'not ie 9' ]
    }
  }
}
