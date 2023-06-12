const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cleide159@',
  database: 'crud',
})

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM crud.multi_images'
  db.query(sql, (err, data) => {
    if(err) return res.json('Error' + err)
    return res.json(data)
  })
})

app.listen(8800, () => {
  console.log('Listening on port 8800')
})