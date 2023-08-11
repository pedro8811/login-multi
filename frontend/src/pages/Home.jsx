import Header from '../components/Header.jsx'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { Button, CardContent, CardActions, Snackbar, Alert, CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { useNavigate } from 'react-router-dom';
import { font } from '../utils/env.js';

const Container = styled.div`
  width: 100%;
  color: #000;
  font-family: ${font};
  .loading{
    margin-top: 230px;
    display: flex;
    justify-content: center;
  }
  .card{
    border: 1px solid #ccc;
    box-shadow: 0 0 4px rgba(0,0,0, .2);
    display: flex;
    flex-direction: column;
    .card-actions{
      display: flex;
      justify-content: right;
      align-items: flex-end;
      margin-top: auto;
    }
  }
  .card-content{
    margin: 0;
    padding: 0;
    padding: 0;
    margin-top: 14px;
    margin-left: 14px;
    p{
      display: contents;
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
  .alert-success{
    background-color: green;
    color: white;
    svg{
      color: white;
    }
  }
  .alert-error{
    background-color: red;
    color: white;
    svg{
      color: white;
    }
  }
`;

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
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: normal;
  display: flex;
  p{
    font-weight: bold;
  }
`;

const Home = () => {
  const navigate = useNavigate()
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    if (!sessionStorage.getItem('isAuthenticated')) {
      navigate('/')
    }
    if (!sessionStorage.getItem('username')) {
      navigate('/')
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.multi.com.br/app/os.php?id=123');
        const jsonData = await response.json()
        setData(jsonData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error' + error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const hasExecutedBefore = sessionStorage.getItem('hasExecutedBefore');
    if (!hasExecutedBefore) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://servicos.multi.com.br:8800/');
          if (response.status == 200) setOpenSuccess(true)
        } catch (error) {
          setOpenError(true)
        }
      }
      sessionStorage.setItem('hasExecutedBefore', true);
      fetchData()
    }
    setTimeout(() => {
      setOpenSuccess(false);
      setOpenError(false)
    }, 3000);
  }, [])

  const ordens = data.ordens
  const success = data.success

  const handleOs = (os) => {
    navigate(`/os/${os}`)
  }

  const formatarData = (data) => {
    if (data) {
      const partes = data.split('-');
      if (partes.length !== 3) {
        return 'Data inválida';
      }
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
  };

  return (
    <div>
      <Header />
      <Container>
        {isLoading ? (
          <div className='loading'>
            <CircularProgress color='success' />
          </div>
        ) : success && Array.isArray(ordens) ? (
          <Grid>
            {ordens.map(os => (
              <div className="card" key={os.idos}>
                <CardContent className="card-content">
                  <Title>Ordem de serviço: <p>&nbsp;{os.idos}</p></Title>
                  <Title>Situação: <p style={{ fontWeight: '500', color: 'green' }}>{os.situacao == 'A' ? 'Ativa' : 'Ativa'}</p></Title>
                  <Title>Lançamento: {formatarData(os.dtlancamento)}</Title>
                  <Title>Visita: {formatarData(os.dtvisita)}</Title>
                  <Title>Serviço: <p>{os.servico}</p></Title>
                </CardContent>
                <CardActions className='card-actions'>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOs(os.idos)}
                    style={{ fontFamily: 'inherit', fontWeight: '500' }}
                  >Abrir OS</Button>
                </CardActions>
              </div>
            ))}
          </Grid>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ fontSize: '22px', color: '#3a3a3a' }}>Não há ordens de serviço ativas</p>
          </div>
        )}
        <Snackbar open={openSuccess} >
          <Alert className='alert-success' severity="success" >
            Conexão com o banco de imagens bem sucedida!
          </Alert>
        </Snackbar>

        <Snackbar open={openError} >
          <Alert className='alert-error' severity="error" >
            Conexão com o banco de imagens falhou!
          </Alert>
        </Snackbar>

      </Container>
    </div>
  )
}

export default Home;
