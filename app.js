const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
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
app.use(methodOverride('_method'))
app.use(routes)



app.listen(port, () => {
  console.log(`app is running on localhost:${port}`)
})
