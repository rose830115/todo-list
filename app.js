const express = require('express')
const mongoose = require('mongoose')
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

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`app is running on localhost:${port}`)
})
