const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')
const util = require('util')

const app = express()
app.use(cors())
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.listen(8800, () => {
  console.log('Listening on port 8800')
})

const db = mysql.createConnection({
  host: '5.161.67.4',
  port: 3306,
  user: 'pedro',
  password: 'P3droT1',
  database: 'multi'
})

const dbQueryAsync = util.promisify(db.query).bind(db);

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
    return
  } else {
    console.log('Conexão bem-sucedida ao banco de dados!')
  }
})

app.get('/version', (req, res) => {
  res.send('1.6')
})

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM multi.images_os'
  db.query(sql, (err, data) => {
    if (err) {
      return res.json('Error: ' + err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/upload', upload.array('OsImage'), async (req, res) => {
  try {
    const files = req.files;
    console.log(files);
    const os = req.body.os;
    const base64Images = await Promise.all(files.map(file => file.buffer));

    if (base64Images.length === 0) {
      res.status(400).send('Nenhuma imagem foi selecionada.');
      return;
    }

    let hasError = false;

    for (const base64Image of base64Images) {
      try {
        const sql = 'INSERT INTO multi.images_os (image, idos) VALUES (?, ?)';
        await dbQueryAsync(sql, [base64Image, os]);
        console.log('Imagem inserida com sucesso no banco de dados');
      } catch (err) {
        console.error(err);
        hasError = true;
      }
    }

    if (hasError) {
      res.status(400).send('Ocorreu um ou mais erros ao enviar as imagens.');
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/:os', (req, res) => {
  const os = req.params.os;
  const sql = 'SELECT image, idimage FROM multi.images_os WHERE idos = ?';
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
