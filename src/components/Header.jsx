import styled from 'styled-components'

const Container = styled.nav`
  width: 100%;
  height: 40px;
`

const Header = () => {
  return (
    <Container>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </Container>
  )
}

export default Header;