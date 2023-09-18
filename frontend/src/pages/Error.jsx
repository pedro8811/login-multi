import styled from "styled-components"
import {font} from '../utils/env'

const Container = styled.div`
  text-align: center;
  font-family: ${font};
  margin: 20% 0;
  p{
  }
  a{
    padding: 20px;
    text-decoration: underline;
  }
`

const ErrorPage = () => {
  return (
    <Container>
      <h1>Erro</h1>
      <p>Você está tentando acessar uma página que não existe</p>
      <a href="/home">Ir para o início</a>
    </Container>
  )
}

export default ErrorPage