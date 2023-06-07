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

const Error = () => {
  return (
    <Container>
      <h1>Error 404</h1>
      <h5>A página que você está tentando acessar não existe</h5>
      <a href="/pedro/home">Retornar a página inicial</a>
    </Container>
  )  
}

export default Error;