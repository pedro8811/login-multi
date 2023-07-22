const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')
const fs = require('fs')
const https = require('https')
require('dotenv').config()

const app = express()
app.use(cors())
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.listen(8800, '192.168.0.252', () => {
  console.log('Listening on port 8800')
})

https.createServer({
  cert: fs.readFileSync('SSL/code.crt'),
  key: fs.readFileSync('SSL/code.key'),
}, app).listen(8801, () => console.log('Listening on https'))


const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})

app.get('/version', (req, res) => {
  res.send('2.3')
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
    const base64Images = files.map(file => file.buffer.toString('base64'));
    base64Images.forEach(async (buffer) => {
      await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO multi.images_os (image, idos) VALUES (?,?)';
        db.query(sql, [buffer, os], (err, result) => {
          if (req.files.length === 0) {
            res.status(400).send('Nenhuma imagem foi selecionada.');
            return;
          }
          if (err) {
            console.log(err);
            reject(err);
            res.sendStatus(400).send('Ocorreu um erro ao enviar a imagem.')
          } else {
            console.log('Imagem inserida com sucesso no banco de dados');
            resolve();
            res.sendStatus(200);
          }
        });
      });
    });
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

app.delete('/imagem/:idimage', (req, res) => {
  const idimage = req.params.idimage;
  const deleteQuery = `DELETE FROM multi.images_os WHERE idimage = ${idimage}`;

  db.query(deleteQuery, (error, results) => {
    if (error) {
      console.error('Erro ao excluir a imagem:', error);
      res.status(500).send('Erro ao excluir a imagem');
    } else {
      res.status(200).send('Imagem excluída com sucesso');
    }
  });
});
