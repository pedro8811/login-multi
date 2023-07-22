import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  align-items: center;
  height: 100vh;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1{
    margin: 0;
  }
  h5{
    margin: 0;
    color: #636363
  }
  a{
    margin: 8px;
    text-decoration: underline;
    color: #5d5d5d;
    cursor: pointer;
    transition: all .2s;
    &:hover{
      color: #000000;
    }
  }
`

const AuthError = () => {
  return (
    <Container>
      <h1>Você não tem acesso a esta seção do site!</h1>
      <h5>Faça o login para poder entrar.</h5>
      <a href="/">Retornar a página de login</a>
    </Container>
  )
}

export default AuthError;