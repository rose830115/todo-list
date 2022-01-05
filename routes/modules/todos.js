// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用todo model
const Todo = require('../../models/todo')

//R進入新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//C新增todo//要和user關聯起來
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name//接住表單資料
  return Todo.create({ name, userId })// 存入資料庫
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//R進入detail頁面//只能看user自己的資料
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })//user資料中找_id一樣資料
    .lean()
    .then((todo) => res.render('datail', { todo }))
    .catch(error => console.error(error))
})

//R進入修改頁面//只能看user自己的資料
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })//user資料中找_id一樣資料
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

//U修改todo//只能看user自己的資料
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ _id, userId })//user資料中找_id一樣資料
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.error(error))
})

//D刪除todo//只能看user自己的資料
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })//user資料中找_id一樣資料
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router