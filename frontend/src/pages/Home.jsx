import Header from '../components/Header.jsx'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { Button, CardContent, CardActions, Snackbar, Alert, CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  color: #000;
  font-family: 'Manrope';
  .card{
    border: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0,0,0, .2);
  }
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

const Home = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    if (!sessionStorage.getItem('isAuthenticated')) {
      navigate('/')
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://multi.com.br/app/os.php?id=123`)
        const jsonData = await response.json()
        setData(jsonData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error' + error)
      }
    }
    fetchData()
  })

  console.log(data)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOs = (os) => {
    navigate(`/${os}`)
  }

  const arrayDeOs = [1]

  return (
    <div>
      <Header />
      <Container>
        {isLoading ? (
          <div >
            <CircularProgress />
          </div>
        ) : arrayDeOs.length ? (
          <Grid>
            {arrayDeOs.map(os => (
              <div className="card" key={os}>
                <CardContent className="card-content">
                  <Title>Ordem de serviço: <p>&nbsp;{os}</p></Title>
                  <Title>Endereço: ...</Title>
                  <Title>Código do imóvel: ...</Title>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="success" onClick={() => handleOs(os)} >Abrir OS</Button>
                </CardActions>
              </div>
            ))}
          </Grid>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ fontSize: '22px', color: '#3a3a3a' }}>Não há ordens de serviço ativas</p>
          </div>
        )}
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Conexão com o banco de dados falhou!
        </Alert>
      </Snackbar>

    </div>
  )
}

export default Home;
