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
  database: 'multi_obras',
})

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM multi_obras.multi_images'
  db.query(sql, (err, data) => {
    if (err) return res.json('Error' + err)
    return res.json(data)
  })
})

app.post('/upload', upload.array('OsImage'), (req, res) => {
  try {
    const files = req.files;
    const os = req.body.os;
    const buffers = files.map(file => file.buffer);
    console.log(files)
    buffers.forEach(async (buffer) => {
      await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO multi_obras.multi_images (image, ordem_servico) VALUES (?,?)';
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
  const os = req.params.os; // Obtém o valor do parâmetro 'os' da URL
  const sql = 'SELECT * FROM multi_obras.multi_images WHERE ordem_servico = ?';
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