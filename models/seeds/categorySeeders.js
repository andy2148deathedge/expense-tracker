if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
const category = require('./category.json')

// db listener
db.once('open', () => {
  Category.create(category.results)
    .then(() => {
      console.log('categorySeeders done.')
      return db.close()
    })
    .then(() => {
      console.log('db connection close temporary for next seeder.')
    })
    .catch(err => console.log(err))
})
