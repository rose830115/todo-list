const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const app = express()
const port = 3000
const db = mongoose.connection

mongoose.connect('mongodb://localhost/todo-list')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

//R進入首頁，抓取資料並渲染
app.get('/', (req, res) => {
  return Todo.find()//取出 Todo model 裡的所有資料
    .lean()//把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))// 將資料傳給 index 樣板
    .catch(error => console.error(error))// 錯誤處理  
})

//R進入新增頁面
app.get('/todos/new', (req, res) => {
  res.render('new')
})

//C新增todo
app.post('/todos', (req, res) => {
  const name = req.body.name//接住表單資料
  return Todo.create({ name })// 存入資料庫
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//R進入detail頁面
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('datail', { todo }))
    .catch(error => console.error(error))
})


//R進入修改頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

//U修改todo
app.post('/todos/:id/edit', (req, res) => {
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
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`app is running on localhost:${port}`)
})
