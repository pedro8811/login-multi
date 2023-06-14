const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')

const app = express()

app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cleide159@',
  database: 'crud',
})

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM crud.multi_images'
  db.query(sql, (err, data) => {
    if (err) return res.json('Error' + err)
    return res.json(data)
  })
})

app.post('/upload', upload.single('OsImage'), (req, res) => {
  file = req.file
  image = file.buffer
  console.log(image)
  const sql = 'INSERT INTO multi_images (image) VALUES (?)';
  db.query(sql, [image], (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    console.log('Imagem inserida com sucesso no banco de dados.');
    return res.sendStatus(200);
  })
})

app.listen(8800, () => {
  console.log('Listening on port 8800')
})