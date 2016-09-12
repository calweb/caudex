module.exports = React => {
  return {
      Home: require('./home')(React),
      Welcome: require('./welcome')(React),
      Results: require('./results')(React)
  }
}
