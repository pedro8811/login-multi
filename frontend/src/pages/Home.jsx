import Header from '../components/Header.jsx'
import styled from 'styled-components'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Container = styled.div`
  width: 100%;
  color: #000;
`

const Grid = styled.div`
  display: grid;
  padding: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  @media (min-width: '700px'){
    grid-template-columns: repeat(3, 1fr);
  }
  img{
    width: 100%;
  }
`

const Home = () => {
  const [os, setOs] = useState({})
  const [fotos, setFotos] = useState('')
  const [error, setError] = useState('')
  const [imageData, setImageData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8800/');
        const jsonData = await response.json();
        setOs(jsonData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    if (os && os.length > 0) {
      setFotos(os[0])

    }
  }, [os, fotos])

  const image = fotos.image

  useEffect((image) => {
    console.log(image)
  },[])

  return (
    <div>
      <Header />
      <Container>
        <Grid>
          <Card>
            <CardContent>
              <h1>titulo</h1>
              <p>id: {fotos.id_image}</p>
              <img src={''} alt="capa" />
            </CardContent>
            <CardActions>
              <Button>Abrir</Button>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              <h1>asdasdasd</h1>
              <p>id: {fotos.id_image}</p>
            </CardContent>
            <CardActions>
              <Button>Abrir</Button>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              <h1>asdasdasd</h1>
              <p>id: {fotos.id_image}</p>
            </CardContent>
            <CardActions>
              <Button>Abrir</Button>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              <h1>asdasdasd</h1>
              <p>id: {fotos.id_image}</p>
            </CardContent>
            <CardActions>
              <Button>Abrir</Button>
            </CardActions>
          </Card>
        </Grid>
        {error && <p>{error}</p>}
      </Container>
    </div>
  )
}

export default Home;
