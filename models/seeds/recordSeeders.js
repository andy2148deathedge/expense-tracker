if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const { recordSeeds } = require('./record.json')
const { user1 } = require('./user.json')

// db listener
db.once('open', async () => {
  try {
    // 建立 user1
    const { name, email, password } = user1
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user1Doc = await User.create({ name, email, password: hash })

    // 建立 user1 的帳目
    recordSeeds.forEach((record) => { record.userId = user1Doc._id })
    await Record.create(recordSeeds)

    // 印出完成
    console.log('recordSeeders done.')
    return db.close()
  } catch (err) {
    console.log(err)
  }
})
