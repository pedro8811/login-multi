import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'
import { GrClose } from 'react-icons/gr'
import {
  Button,
  Tooltip,
  IconButton,
  Box,
  Modal,
  CircularProgress
} from '@mui/material'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useState } from 'react'
import { host } from '../utils/env.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const styleLoading = {
  position: 'absolute',
  textAlign: 'center',
  color: 'white',
  fontSize: '40px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

const Container = styled.div`
  width: 100%;
  padding: 45px 100px;
  font-family: 'Manrope';
  section{
    padding: 15px;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid #a7a7a7;
    -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    h1{
      font-size: 20px;
    }
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
  grid-template-columns: repeat(5, 1fr);
  a{
    display: flex;
    align-items: center;
    img{
      width: 100%;
    }
    cursor: pointer;
    border: 2px solid transparent;
    &:hover{
      border: 2px solid #075800;
    }
  }
`

const isValidNumber = (value) => {
  return /^\d+$/.test(value);
}

const OrdemServico = () => {
  const { os } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(!sessionStorage.getItem('isAuthenticated')){
      navigate('/')
    }
  })

  useEffect(() => {
    if(sessionStorage.getItem('isAuthenticated') === false){
      navigate('/')
    }
  })

  if (!isValidNumber(os)) {
    navigate('/home')
  }

  const [data, setData] = useState([])
  const [base64, setBase64] = useState([])
  const [arrayImg, setArrayImg] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openLoading, setOpenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const handleOpenModal = (index) => {
    setOpen(true);
    setSelectedImage(base64[index]);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/${os}`);
        const jsonData = await response.json();
        setData(jsonData)
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [os]);

  useEffect(() => {
    setArrayImg(data.map(obj => obj.image.data));
  }, [data]);

  useEffect(() => {
    const imageBase64 = []
    if (data.length > 0 && arrayImg.length > 0) {
      const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      };
      arrayImg.forEach((image) => {
        const base = arrayBufferToBase64(image);
        imageBase64.push(base)
      });
      setBase64(imageBase64);
    }
  }, [arrayImg]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(`${host}/upload`, {
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
    navigate(`/home`)
  }

  const handleClick = () => {
    setOpenLoading(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
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
                <Tooltip title="Clicar neste botão após inserir as imagens no botão ao lado">
                  <Button
                    className='btn btn-success'
                    variant="contained"
                    color="success"
                    onClick={handleClick}
                    type="submit">
                    Enviar
                  </Button>
                </Tooltip>
              </form>
            </div>
          </Grid>
          <hr />
          <h1>Fotos</h1>
          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress />
            </div>
          ) : base64.length ? (
            <ImgGrid>
              {base64.map((image, index) => (
                <a key={index} onClick={() => handleOpenModal(index)}>
                  <img src={`data:image/jpeg;base64, ${image}`} alt="" />
                </a>
              ))}
            </ImgGrid>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '22px', color: '#3a3a3a' }}>Não há imagens nesta O.S</p>
            </div>
          )}
        </section>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedImage && <img width="100%" src={`data:image/jpeg;base64, ${selectedImage}`} alt="" />}
          </Box>
        </Modal>
      </Container>

      <Modal
        open={openLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleLoading}>
          <CircularProgress color="inherit" />
        </Box>
      </Modal>

    </div>
  )
}

export default OrdemServico;