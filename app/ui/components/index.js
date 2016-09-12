module.exports = React => {
  return {
    App: require('./App')(React),
    Footer: require('./Footer')(React),
    Header: require('./Header')(React),
    Importer: require('./Importer')(React)
  }
}
