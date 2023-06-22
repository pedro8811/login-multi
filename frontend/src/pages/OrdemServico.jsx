import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'
import { GrClose } from 'react-icons/gr'
import { Button, Tooltip, IconButton, Backdrop, Box, Modal, Fade } from '@mui/material'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

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
  #icon-close{
    font-size: 25px;
  }
  .form{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    align-items: center;
    label{
      #icon-img{
        font-size: 38px;
      }
      text-align: center;
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
  a{
    cursor: pointer;
    border: 2px solid transparent;
    &:hover{
      border: 2px solid #575757;
    }
  }
`

const OrdemServico = () => {
  const { os } = useParams()
  const [data, setData] = useState([])
  //const [url, setUrl] = useState('')
  const [arrayImg, setArrayImg] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8800/${os}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setArrayImg(data.map(obj => obj.image))
  }, []);

  useEffect(() => {
    if (data.length > 0 && arrayImg.length > 0) {
      const image = arrayImg[0];
      const imageData = image['data'];
      console.log(imageData)
    }
  }, [arrayImg]);

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

  const handleOs = () => {
    navigate(`/pedro/home`)
  }

  const handleClick = () => {
    window.location.reload()
  }

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
                  <IconButton onClick={() => handleOs()}>
                    <GrClose id="icon-close" />
                  </IconButton>
                </Tooltip>
              </div>
              <form onSubmit={handleSubmit} className='form'>
                <Tooltip className="label" title="Inserir imagens">
                  <label htmlFor={`picture__input_${os}`}>
                    <MdAddPhotoAlternate id="icon-img" />
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
                  onClick={handleClick}
                  type="submit">
                  Enviar
                </Button>
              </form>
            </div>
          </Grid>
          <hr />
          <h1>Fotos</h1>
          <ImgGrid>
            <a onClick={handleOpen}>
              <img src='https://picsum.photos/id/16/399/230' alt="" />
            </a>
          </ImgGrid>
        </section>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 200,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <img src='https://picsum.photos/id/16/399/230' alt="" />
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default OrdemServico;