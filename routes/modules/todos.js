// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用todo model
const Todo = require('../../models/todo')

//R進入新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//C新增todo
router.post('/', (req, res) => {
  const name = req.body.name//接住表單資料
  return Todo.create({ name })// 存入資料庫
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//R進入detail頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('datail', { todo }))
    .catch(error => console.error(error))
})

//R進入修改頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

//U修改todo
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.error(error))
})

//D刪除todo
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router