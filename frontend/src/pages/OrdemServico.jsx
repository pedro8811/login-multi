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
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useState } from 'react'
import { host, font, formatarData } from '../utils/env.js'

// style modal de imagem
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '600px',
  maxHeight: '900px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// style modal de formulário de finalização
const styleFinal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 10,
};

// style modal de animação do loading
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
  font-family: ${font};
  section{
    margin: 40px;
    padding: 10px 40px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    font-family: ${font};
    /* padding: 15px; */
    background: rgb(255, 255, 255);
    /* border-radius: 5px; */
    border: 1px solid #a7a7a7;
    /* -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75); */
    h1{
      font-size: 20px;
    }
    p{
      font-size: 18px;
      margin: 0;
      padding: 0;
    }
  }
  .alert-error{
    background-color: red;
    color: white;
    svg{
      color: white;
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

const Form = styled.form`
  font-family: ${font};
  font-weight: 400;
`

const isValidNumber = (value) => {
  return /^\d+$/.test(value);
}

const OrdemServico = () => {
  const { os } = useParams()
  const navigate = useNavigate()
  const [dadosOs, setDadosOs] = useState({})
  const [data, setData] = useState([])
  const [base64, setBase64] = useState([])
  const [arrayImg, setArrayImg] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openLoading, setOpenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [openError, setOpenError] = useState(false)
  const [desc, setDesc] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [openFinal, setOpenFinal] = useState(false);
  const handleOpenFinal = () => setOpenFinal(true);
  const handleCloseFinal = () => setOpenFinal(false);

  // segurança
  useEffect(() => {
    if (!sessionStorage.getItem('isAuthenticated')) {
      navigate('/')
    }
    if (sessionStorage.getItem('isAuthenticated') === false) {
      navigate('/')
    }
  })
  // verificar paramentro na url
  if (!isValidNumber(os)) {
    navigate('/home')
  }
  // abrir modal de imagem
  const handleOpenModal = (index) => {
    setOpen(true);
    setSelectedImage(base64[index]);
  };
  // fechar modal de imagem
  const handleCloseModal = () => setOpen(false);
  // fetch nas imagens da os
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
  // fetch nos dados da os
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.multi.com.br/app/os.php?idos=${os}`)
        const jsonData = await res.json()
        setDadosOs(jsonData.ordens[0])
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  })
  // função auxiliar para mostrar imagens
  useEffect(() => {
    setArrayImg(data.map(obj => obj.image.data));
  }, [data]);
  // função auxiliar para mostrar imagens
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
  // função de enviar as imagens
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(`${host}/upload`, {
      method: 'POST',
      body: formData
    })
      .then(data => {
        if (data.status == 400) {
          setOpenError(true)
        } else {
          setOpenLoading(true)
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      })
      .catch();
  };
  //time para fechar aviso de erro de fotos vazias
  useEffect(() => {
    setTimeout(() => {
      setOpenError(false)
    }, 5000)
  })
  // função de finalizar e enviar OS
  const handleSubmitFinal = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);

    fetch('', {
      method: 'POST',
      body: formData
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  // função de fechar os / voltar para home
  const handleCloseOs = () => navigate(`/home`);
  // função de disabilitar ou habilitar o botão de envio conforme valor do input
  const handleDescChange = (event) => {
    const newValue = event.target.value
    setDesc(event.target.value)
    setButtonDisabled(!newValue.trim());
  }
  // função de voltar apertando ESC
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handleCloseOs();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <section>
          <Grid>
            <div className='infos'>
              <p>Número da os: {os}</p>
              <p>Situação: Ativa</p>
              <p>Lançamento: {formatarData(dadosOs.dtlancamento)}</p>
              <p>Visita: {formatarData(dadosOs.dtvisita)}</p>
              <p>Serviço: {dadosOs.servico}</p>
            </div>
            <div className='buttons'>
              <div>
                <Tooltip title="Fechar ou pressione 'ESC'">
                  <IconButton onClick={() => handleCloseOs()}>
                    <GrClose id="icon-close" />
                  </IconButton>
                </Tooltip>
              </div>
              <form onSubmit={handleSubmit} className='form'>
                <Tooltip className="label" title="Inserir imagens">
                  <label htmlFor={`picture__input_${os}`} tabIndex='1'>
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
                <Tooltip title="Clique neste botão após inserir as imagens no botão ao lado!">
                  <Button
                    className='btn btn-success'
                    variant="contained"
                    color="success"
                    type="submit"
                    style={{ fontFamily: 'inherit', fontWeight: '500' }}
                  >Enviar</Button>
                </Tooltip>
              </form>

              <Button
                onClick={handleOpenFinal}
                variant="contained"
                color="error"
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              >Finalizar</Button>

              {/* modal de finalização de OS */}
              <Modal
                open={openFinal}
                onClose={handleCloseFinal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleFinal} className='p-4'>
                  <Form onSubmit={handleSubmitFinal}>
                    <div className="form-group">
                      <textarea
                        placeholder='...'
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="7"
                        name='descricao'
                        onChange={handleDescChange}
                        value={desc}
                      ></textarea>
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                      <Button
                        onClick={handleCloseFinal}
                        variant='contained'
                        className='me-2'
                        color="success"
                        style={{ fontFamily: 'inherit' }}
                      >Cancelar</Button>
                      <Button
                        type='submit'
                        variant='contained'
                        color="error"
                        style={{ fontFamily: 'inherit' }}
                        disabled={buttonDisabled}
                      >Finalizar</Button>
                    </div>
                  </Form>
                </Box>
              </Modal>

            </div>
          </Grid>
          <hr />
          <h1>Fotos</h1>
          {isLoading ? (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress color='success' />
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

        {/* modal que mostra imagem grande */}
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedImage && <img style={{ width: '100%', height: 'auto' }}
              src={`data:image/jpeg;base64, ${selectedImage}`} alt="" />}
          </Box>
        </Modal>

        {/* pop-up de erro */}
        <Snackbar open={openError} >
          <Alert className='alert-error' severity="error" >
            Nenhuma imagem foi selecionada!
          </Alert>
        </Snackbar>

      </Container>

      {/* modal de loading */}
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