import Header from '../components/Header.jsx'
import styled from 'styled-components'
import AuthContext from '../context/AuthContext.jsx'
import { useContext, useLocation } from 'react'

const Container = styled.div`
  width: 100%;
`

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext)
  console.log(isAuthenticated)

  const location = useLocation();
  console.log(location)

  if (isAuthenticated) return (
    <Container>
      <Header />
    </Container>
  )
}

export default Home;
