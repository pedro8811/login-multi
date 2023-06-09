import Header from '../components/Header.jsx'
import styled from 'styled-components'
import AuthContext from '../context/AuthContext.jsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
`

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/pedro')
  }

  if (isAuthenticated) return (
    <Container>
      <Header />
    </Container>
  )
}

export default Home;
