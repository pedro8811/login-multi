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

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    const imageData = buffer.toString('base64');

    // Inserir a imagem no banco de dados
    const sql = 'INSERT INTO crud.multi_images (filename, data) VALUES (?, ?)';
    db.query(sql, [originalname, imageData], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao fazer o upload da imagem no banco de dados.');
      } else {
        res.status(200).send('Imagem salva com sucesso!');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao fazer o upload da imagem.');
  }
});

app.listen(8800, () => {
  console.log('Listening on port 8800')
})