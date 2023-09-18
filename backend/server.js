const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')
const util = require('util')
const fs = require('fs')
const path = require('path');

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
  res.send('1.3')
})

app.get('/qtd', (req, res) => {
  const sql = 'SELECT COUNT(*) FROM multi.images_os'
  db.query(sql, (err, data) => {
    if (err) {
      return res.json('Error: ' + err)
    } else {
      return res.send(data[0])
    }
  })
})

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM multi.images_os'
  db.query(sql, (err, data) => {
    if (err) {
      return res.json('Error: ' + err)
    } else {
      return res.send(data)
    }
  })
})

app.post('/upload', upload.array('OsImage'), async (req, res) => {
  try {
    const files = req.files;
    console.log(files);
    const os = req.body.os;
    const base64Images = await Promise.all(files.map(file => file.buffer));

    if (base64Images.length === 0 || files.length == 0) {
      res.status(400).send('Nenhuma imagem foi selecionada.');
      return;
    }

    // Função para criar uma string de 6 dígitos a partir de 'os'
    function padToSixDigits(number) {
      const stringifiedNumber = String(number);
      const numberOfZerosToAdd = 6 - stringifiedNumber.length;
      if (numberOfZerosToAdd > 0) {
        return '0'.repeat(numberOfZerosToAdd) + stringifiedNumber;
      }
      return stringifiedNumber;
    }

    const paddedOs = padToSixDigits(os);

    // http://servicos.multi.com.br/fotos/id_os/foto.jpg

    let hasError = false;

    for (let i = 0; i < base64Images.length; i++) {
      const base64Image = base64Images[i];

      try {
        const sql = 'INSERT INTO multi.images_os (image, idos) VALUES (?, ?)';
        await dbQueryAsync(sql, [base64Image, os]);

        const imageName = `foto_${i + 1}.jpg`;
        const imagePath = path.join(__dirname, 'fotos', String(paddedOs), imageName);

        // Garantir que a pasta exista
        const folderPath = path.dirname(imagePath);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        // Salvar a imagem na pasta do servidor
        fs.writeFileSync(imagePath, base64Image);

        console.log(`Imagem salva em: ${imagePath}`);

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
