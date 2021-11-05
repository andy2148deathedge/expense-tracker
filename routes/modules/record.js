const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      res.render('new', { categories })
    })
    .catch(e => console(e))
})

router.post('/', (req, res) => {
  // 拿到 new 表單內容存入資料庫 並且重定向至 '/'
  const newRecord = req.body
  newRecord.amount = Number(newRecord.amount)
  newRecord.userId = req.user._id

  Record.create(newRecord)
    .catch(e => console.log(e))

  res.redirect('/')
})

router.get('/:_id/edit', (req, res) => {
  const id = req.params._id

  return Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => Promise.all([categories, Record.findById(id).lean()]) // 用 Promise.all 控制流程
      .then(([categories, record]) => res.render('edit', { categories, record }))
      .catch(e => {
        console.log(e)
        res.redirect('/')
      }))
      // .then(() => setTimeout(() => res.redirect('/'), 5000))) // 找不到該路由的狀況下 5 秒後重導回首頁或者可以跳錯誤訊息給使用者再重導向之類的處理
    // .catch(e => console.log(e)) 修正註解: 多餘的 .catch()
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newRecord = req.body
  newRecord.amount = Number(newRecord.amount)

  return Record.updateOne({ _id: id }, newRecord)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.deleteOne({ _id: id })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

module.exports = router
