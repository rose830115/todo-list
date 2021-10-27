const mongoose = require('mongoose')
const db = mongoose.connection
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/todo-list')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 1; i <= 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})