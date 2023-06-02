import styled from 'styled-components'
import logo from '../assets/logo.webp';

const ContainerHeader = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0,0,0,.4);
  justify-content: space-between;
`

const Menu = styled.ul`
  padding: 30px;
  list-style-type: none;
  display: flex;
  margin: 0;
  li{
    a{
      color: #000;
      font-size: 1.2em;
      margin-right: 20px;
      &:hover{
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  `

const Logo = styled.img`
  padding: 30px;
  width: 150px;
`

const Header = () => {
  return (
    <ContainerHeader>
      <a href="/home">
      <Logo src={logo}/>
      </a>
      <Menu>
        <li><a>Início</a></li>
        <li><a>Locação</a></li>
        <li><a>Vendas</a></li>
        <li><a>Financeiro</a></li>
        <li><a>Taxas</a></li>
        <li><a>Jurídico</a></li>
      </Menu>
    </ContainerHeader>
  )
}

export default Header;