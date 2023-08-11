import styled from 'styled-components';
import { Input } from 'antd';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useState } from 'react';
import logo from '../assets/logo.webp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { font } from '../utils/env'
import { Snackbar, Alert } from '@mui/material'

const Card = styled.div`
  width: 400px;
  background: #f0f0f0;
  padding: 25px;
  box-shadow: 1px 2px 8px #929292;
  color: #575757;
  font-family: ${font};
  border-radius: 10px;
  display: flex;
  text-align: center;
  flex-direction: column;
  img{
    margin: auto;
    width: 100%;
  }
  h3{
    margin: 0;
    margin-bottom: 20px;
    font-weight: 400;
  }
  form{
    width: 100%;
    span{
      input{
        height: 40px;
        font-family: ${font};
        ::placeholder{
          font-family: ${font};
          font-size: 16px;
          color: #969696;
        }
        &:hover{
          border: 1px solid rgb(0,89,0);
        }
        &:focus{
          border: 1px solid rgb(0,89,0);
        }
      }
      margin-bottom: 5px;
    }
  }
`

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-family: ${font};
  font-size: 1.2em;
  width: 100%;
  margin-top: 10px;
  transition: all .3s;
  background: rgb(0, 77, 36);
  &:hover{
    cursor: pointer;
    background: rgb(0, 95, 44);
  }
`

const Message = styled.p`
  margin: 0;
  margin-top: 5px;
  margin-bottom: 5px;
  color: red;
  font-size: 15px;
`

const CredentialsCard = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(true)
  const navigate = useNavigate();

  const url = 'https://www.multi.com.br/app/login.php?';
  const data = {
    user: login,
    pwd: password,
    interno: true,
  }

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        url,
        data,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      // sessionStorage.setItem('userToken', response.data.sessionToken)
      // const userId = sessionStorage.getItem('userToken')
      // // console.log(userId)

      if (data.login == undefined || data.login == '') {
        setMessage('Login falhou!')
        setShow(true)
      }
      if (data.pwd == undefined || data.pwd == '') {
        setMessage('Login falhou!')
        setShow(true)
      }
      if (response.data.success == 'false') {
        sessionStorage.setItem('isAuthenticated', false);
        setMessage('Login falhou!')
      } else if (response.data.success == 'true' && response.data.nome != "") {
        setShow(false)
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('username', response.data.nome);
        navigate('/home');
        return
      }
    } catch (error) {
      console.error('Erros: ' + error);
      setOpen(true)
    }
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <Card>
      <img src={logo} alt="logo multi" />
      <h3>Seja bem-vindo!</h3>
      <form onSubmit={handleSubmit}>
        <Input addonAfter={<AiOutlineUser fontSize={'20px'} />} placeholder="Digite o seu login" value={login} onChange={handleEmailChange} />
        <Input addonAfter={<AiOutlineLock fontSize={'20px'} />} placeholder="Digite sua senha" type="password" value={password} onChange={handlePasswordChange} />
        {show && <Message>{message}</Message>}
        <Button type="primary">Entrar</Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity="error">Houve um problema com a conexão</Alert>
      </Snackbar>
    </Card>
  )
}

export default CredentialsCard;
