import CredentialsCard from '../components/CredentialsCard'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://www.multi.com.br/pedro/images/smooth-white-plaster-wall.webp");
  background-repeat: no-repeat;
  background-size: cover;
`

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Container>
      <CredentialsCard />
    </Container>
  )
}

export default Login
