import CredentialsCard from '../components/CredentialsCard'
import styled from 'styled-components'
import background from '../assets/login.webp';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
`

function Login() {
  sessionStorage.clear()
  return (
    <Container>
      <CredentialsCard />
    </Container>
  )
}

export default Login
