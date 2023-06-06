import styled from 'styled-components';
import { Input } from 'antd';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useContext, useState } from 'react';
import logo from '../assets/logo.webp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

const Card = styled.div`
  width: 400px;
  height: 350px;
  background: #f0f0f0;
  padding: 25px;
  box-shadow: 1px 2px 8px #929292;
  color: #575757;
  font-family: 'Montserrat';
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
        ::placeholder{
          font-family: 'Montserrat';
          font-size: 16px;
          color: #686868;
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
  .esqueci-senha{
    margin: 5px 0px;
    font-size: 14px;
    text-align: right;
    transition: .2s all;
    &:hover{
      text-decoration: underline;
      color: rgb(0,89,0);
      cursor: pointer;
    }
  }
`

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-family: 'Montserrat';
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
  color: red;
  font-size: 15px;
`

const CredentialsCard = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();
  const url = 'https://www.multi.com.br/app/login.php?';
  const data = {
    user: login,
    pwd: password,
    interno: true,
  }

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

      console.log(response.data);

      if (response.data.success == 'true') {
        setIsAuthenticated(true);
        navigate('/pedro/home');
      } else {
        setIsAuthenticated(false);
        setLoginFailed(true);
      }
    } catch (error) {
      console.error('Erros: ' + error);
    }
  };

  return (
    <Card>
      <img src={logo} alt="" />
      <h3>Seja bem-vindo!</h3>
      <form onSubmit={handleSubmit}>
        <Input addonAfter={<AiOutlineUser fontSize={'20px'} />} placeholder="Digite o seu login" value={login} onChange={handleEmailChange} />
        <Input addonAfter={<AiOutlineLock fontSize={'20px'} />} placeholder="Digite sua senha" type="password" value={password} onChange={handlePasswordChange} />
        <Message>{loginFailed && !isAuthenticated ? 'Login falhou!' : ''}</Message>
        <Button type="primary">Entrar</Button>
      </form>
      <a className="esqueci-senha">Esqueci minha senha</a>
    </Card>
  )
}

export default CredentialsCard;
