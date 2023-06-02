import Header from '../components/Header.jsx'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  width: 100%;
`

const Home = () => {
  const [userData, setUserData] = useState(null);

  const url = 'https://www.multi.com.br/app/login.php'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      {userData && (
        <h1>Welcome {userData.user}</h1>
      )}
    </Container>
  )
}

export default Home;
