import { useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { host, font } from '../utils/env'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, IconButton, Tooltip, Modal, Button, Box, Checkbox } from '@mui/material'
import { MdDelete } from 'react-icons/md'
import { ImageCard } from '../components/ImageCard'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const Container = styled.main`
  margin: 40px;
  padding: 10px 40px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  font-family: ${font};
  .loading{
    text-align: center;
  }
`
const Title = styled.h1`
  font-size: 32px;
  font-weight: 350;
  text-align: center;
`
const Infos = styled.div`
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  p{
    margin: 0;
  }
`
const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.value}, 1fr);
`
const CardImage = styled.div`
  margin: 10px;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 0 10px rgba(0,0,0,.5);
  p{margin: 0;}
  img{
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    width: 100%;
    margin-bottom: 10px;
  }
`

const Admin = () => {
  const [quantidade, setQuantidade] = useState();
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const [selectedItems, setSelectedItems] = useState([]);

  // segurança
  useEffect(() => {
    if (!sessionStorage.getItem('isAuthenticated')) {
      navigate('/')
    }
    if (sessionStorage.getItem('username') != 'Pedroti') {
      navigate('/home')
    }
  })
  // fetch na quantidade de fotos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/qtd`);
        const jsonData = await response.json()
        setQuantidade(jsonData['COUNT(*)'])
      } catch (error) {
        console.error('Error' + error)
      }
    }
    fetchData()
  }, [])
  // fetch nas imagens
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${host}`)
        const jsonData = await res.json()
        setData(jsonData)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  const handleDelete = (id) => {
    fetch(`${host}/imagem/${id}`, {
      method: 'DELETE',
    })
      .then(data => {
        if (data.status == 400) {
          ''
        } else {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      })
      .catch();
  }

  const handleDeleteMultiple = () => {
    selectedItems.forEach(id => {
      handleDelete(id)
    })
  }




  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const checkBoxHandler = (e) => {
    let isSelected = e.target.checked
    let value = parseInt(e.target.value)

    if (isSelected) {
      setSelectedItems([...selectedItems, value])
    } else {
      setSelectedItems(prevData => {
        return prevData.filter(id => {
          return id !== value
        })
      })
    }
  }



  console.log(selectedItems)







  return (
    <div>
      <Header />
      <Container>
        <Title>Painel de Administrador</Title>
        <Grid value={3}>
          <Infos>Quantidade de fotos: &nbsp;<p style={{ fontWeight: 'bold' }}>{quantidade}</p></Infos>
          <Infos>-</Infos>
          <Infos>-</Infos>
        </Grid>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Tooltip title="Apagar selecionadas">
            <span>
              <IconButton onClick={handleOpen}>
                <MdDelete />
              </IconButton>
            </span>
          </Tooltip>
        </div>
        {isLoading ? (
          <div className='loading'>
            <CircularProgress color='success' />
          </div>
        ) : data.length > 0 ? (
          <Grid value={4}>
            {data.map((os) => (
              <CardImage key={os.idimage}>
                <img src={`data:image/jpeg;base64, ${arrayBufferToBase64(os.image.data)}`} />
                <p>ID da imagem: <b>{os.idimage}</b></p>
                <p>ID da ordem de serviço: <b>{os.idos}</b></p>
                <form style={{ display: 'flex' }}>
                  <Checkbox
                    checked={selectedItems.includes(os.idimage)}
                    value={os.idimage}
                    onChange={checkBoxHandler} />
                </form>
              </CardImage>
            ))}
          </Grid>
        ) : (
          <p>Nenhuma foto foi upada</p>
        )}
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h4>Deseja confirmar a exclusão dos items selecionados?</h4>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              style={{ fontFamily: font }}
              onClick={handleClose}
              variant="contained"
              color="error">
              Cancelar
            </Button>
            <Button
              style={{ fontFamily: font }}
              onClick={handleDeleteMultiple}
              variant="contained"
              color="success">
              Confirmar
            </Button>
          </div>
        </Box>
      </Modal>

    </div>
  )
}

export default Admin