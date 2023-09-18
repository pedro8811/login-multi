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
  #background{
    position: fixed;
    width: auto;
  }
`

function Login() {
  sessionStorage.clear()
  return (
    <Container>
      <img id="background" src={background} alt="background image" />
      <CredentialsCard />
    </Container>
  )
}

export default Login
