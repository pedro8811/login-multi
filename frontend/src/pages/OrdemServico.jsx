import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'
import { GrClose } from 'react-icons/gr'
import { Button, Tooltip, IconButton } from '@mui/material'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useState } from 'react'

const Container = styled.div`
  width: 100%;
  padding: 25px 100px;
  font-family: 'Montserrat';
  section{
    h1{
      font-size: 20px;
    }
    padding: 15px;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid #a7a7a7;
    box-shadow: 0 0 2px rgba(0,0,0,.3);
    p{
      font-size: 18px;
      margin: 0;
      padding: 0;
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  .buttons{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .picture__input{
      display: none;
    }
    div:nth-child(1){
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    div:nth-child(2){
    }
  }
  #icon{
    float: right;
    font-size: 20px;
  }
  .form{
    display: flex;
    align-items: center;
    label{
      color: rgb(46,125,50);
      transition: all .2s;
      &:hover{
        color: rgb(27,94,32);
        cursor: pointer;
      }
    }
  }
`

const ImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const OrdemServico = () => {
  const { os } = useParams()
  const [data, setData] = useState([])
  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8800/${os}`);
        const jsonData = await response.json();
        setData(jsonData)
        const arrayImg = await data.map(obj => obj.image)
        const image = await arrayImg[0]
        console.log(image)
        const imageData = await image['data']
        console.log(imageData)
        setUrl(imageData.toString('base64'))
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch('http://localhost:8800/upload', {
      method: 'POST',
      body: formData
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <Container>
        <section>
          <Grid>
            <div className='infos'>
              <p>Número da os: {os}</p>
              <p>Endereço: ...</p>
              <p>Código do imóvel: ...</p>
              <p>Status: ...</p>
            </div>
            <div className='buttons'>
              <div>
                <Tooltip title="Fechar">
                  <IconButton href="/pedro/home">
                    <GrClose id="icon" />
                  </IconButton>
                </Tooltip>
              </div>
              <form onSubmit={handleSubmit} className='form'>
                <Tooltip className="label" title="Inserir imagens">
                  <label htmlFor={`picture__input_${os}`}>
                    <MdAddPhotoAlternate id="icon" />
                  </label>
                </Tooltip>
                <input
                  type="hidden"
                  name="os"
                  value={os} />
                <input
                  type="file"
                  name="OsImage"
                  multiple
                  id={`picture__input_${os}`}
                  className="picture__input"
                  accept="image/*" />
                <Button
                  className='btn btn-success'
                  variant="contained"
                  color="success"
                  type="submit">
                  Enviar
                </Button>
              </form>
            </div>
          </Grid>
          <hr />
          <h1>Fotos</h1>
          <ImgGrid>
            <img src={url} alt="" />
          </ImgGrid>
        </section>
      </Container>
    </div>
  )
}

export default OrdemServico;