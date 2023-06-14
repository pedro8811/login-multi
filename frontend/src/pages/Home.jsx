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

const Home = () => {
  const [os, setOs] = useState({})
  const [fotos, setFotos] = useState('')
  const [error, setError] = useState('')

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

  const arrayDeOs = [
    {id_os: 1},
    {id_os: 2},
    {id_os: 3},
    {id_os: 4},
    {id_os: 5},
    {id_os: 6},
    {id_os: 7},
    {id_os: 8},
    {id_os: 9},
    {id_os: 10},
  ]

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
        </Grid>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" name="OsImage" />
          <button type="submit">Upload</button>
        </form>
      </Container>
    </div>
  )
}

export default Home;
