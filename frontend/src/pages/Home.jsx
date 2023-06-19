import Header from '../components/Header.jsx'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md'
import { Tooltip, Box, Modal, Button, CardContent, CardActions, Backdrop, Fade } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Container = styled.div`
  width: 100%;
  color: #000;
  .card-content{
    margin: 0;
    padding: 0;
    padding: 0;
    margin-top: 14px;
    margin-left: 14px;
    p{
      margin: 0;
    }
  }
  form{
    label{
      color: rgb(46,125,50);
      font-size: 30px;
      margin-left: 5px;
      margin-bottom: 15px;
      transition: all .2s;
      &:hover{
        color: rgb(27,94,32);
        cursor: pointer;
      }
    }
  }
  .picture__input{
    display: none;
  }
  .botoes{
    margin: auto;
    display: flex;
    button{
      margin-right: 20px;
    }
  }
`

const Grid = styled.div`
  display: grid;
  padding: 30px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  @media (min-width: '700px'){
    grid-template-columns: repeat(3, 1fr);
  }
  img{
    width: 100%;
  }
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: normal;
  display: flex;
  p{
    font-weight: bold;
  }
`

const ImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  img{
    width: 250px;
  }
`

const Home = () => {
  const [ordemServico, setOrdemServico] = useState({})
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8800/');
        const jsonData = await response.json();
        setOrdemServico(jsonData);
        console.log(ordemServico)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  const arrayDeOs = [1, 2, 3, 4, 5, 6]

  return (
    <div>
      <Header />
      <Container>
        <Grid>
          {arrayDeOs.map(os => (
            <div className="card" key={os}>
              <CardContent className="card-content">
                <Title>Ordem de serviço: <p>&nbsp;{os}</p></Title>
                <Title>Endereço: ...</Title>
                <Title>Código do imóvel: ...</Title>
              </CardContent>
              <CardActions>
            {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <div className='botoes'>
                    <Button variant="contained" color="success" type="submit">Enviar</Button >
                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      color="success"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Visualizar fotos
                    </Button >
                  </div>
                </form> */}
                <Button variant="contained" color="success" href={`/pedro/${os}`} >Abrir OS</Button>
              </CardActions>
            </div>
          ))}
        </Grid>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, }, }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <Typography id="transition-modal-title" variant="h6" component="h2" className="m-0">
              Imagens
            </Typography> */}
            <ImgGrid>
              <figure>
                <img src="" alt="img" />
              </figure>
              <figure>
                <img src="" alt="img" />
              </figure>
              <figure>
                <img src="" alt="img" />
              </figure>
            </ImgGrid>
          </Box>
        </Fade>
      </Modal>

    </div>
  )
}

export default Home;
