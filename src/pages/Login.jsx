import CredentialsCard from '../components/CredentialsCard'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgb(230, 255, 230); */
  background: url(../src/assets/smooth-white-plaster-wall.jpg);
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
