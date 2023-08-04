import styled from 'styled-components'
import logo from '../assets/logo.webp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ContainerHeader = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0,0,0,.4);
  justify-content: space-between;
`

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  align-items: center;
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
  #basic-button{
    margin-right: 30px;
    font-family: 'Manrope', sans-serif;
    color: #000;
    &:hover{
      background: none;
      text-decoration: underline;
    }
  }
  `

const Logo = styled.img`
  cursor: pointer;
  padding: 20px;
  width: 210px;
`

const Header = () => {
  const user = sessionStorage.getItem('username')

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/')
    sessionStorage.clear()
  }

  return (
    <ContainerHeader>
      <a onClick={() => navigate('/home')}>
        <Logo src={logo} />
      </a>
      <NavLinks>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          {user}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleLogout} id="exit-button">Sair</MenuItem>
        </Menu>
      </NavLinks>
    </ContainerHeader>
  )
}

export default Header;