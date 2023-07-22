import CredentialsCard from '../components/CredentialsCard'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("http://servicos.multi.com.br/images/smooth-white-plaster-wall.webp");
  background-repeat: no-repeat;
  background-size: cover;
`

function Login() {
  return (
    <Container>
      <CredentialsCard />
    </Container>
  )
}

export default Login
