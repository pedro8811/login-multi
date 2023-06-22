const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')
require('dotenv').config()

console.log(process.env.DATABASE_PASSWORD)

const app = express()

app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM multi.images_os'
  db.query(sql, (err, data) => {
    if (err) return res.json('Error' + err)
    return res.json(data)
  })
})

app.post('/upload', upload.array('OsImage'), (req, res) => {
  try {
    const files = req.files;
    const os = req.body.os;
    const mimetype = req.files.mimetype
    console.log(req.files)
    const base64Images = files.map(file => file.buffer.toString('base64'));
    base64Images.forEach(async (buffer) => {
      await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO multi.images_os (image, idos) VALUES (?,?)';
        db.query(sql, [buffer, os], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('Imagem inserida com sucesso no banco de dados');
            resolve();
          }
        });
      });
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/:os', (req, res) => {
  const os = req.params.os;
  const sql = 'SELECT image FROM multi.images_os WHERE idos = ?';
  db.query(sql, [os], (err, data) => {
    if (err) {
      return res.json('Error: ' + err);
    } else {
      return res.json(data);
    }
  });
});

app.listen(8800, () => {
  console.log('Listening on port 8800')
})