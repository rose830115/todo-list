const Todo = require('../todo')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 1; i <= 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})