import React, {useState} from 'react';
import styled from 'styled-components';
import { IoIosReturnLeft } from "react-icons/io";
import Link from 'next/link';
import { fetchUsers } from '../API/api';
import { useRouter } from 'next/router';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
`;

const Header = styled.div`
  width: 100%;
  background-color: #2e7d32;
  border-radius: 6px;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 92%;
  &:focus {
    outline: none;
    border-color: #2e7d32;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1b5e20;
  }
`;

const StyledLink = styled.a`
  color: ${({ color }) => color || '#1b5e20'};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #1b5e20;
  }
`;

const HelperText = styled.p`
  text-align: center;
  margin-top: 0.5rem;
`;

const TopIconLink = styled.a`
  top: 1rem;
  left: 1rem;
  color: #1b5e20;
  cursor: pointer;

  &:hover {
    color: #145a14;
  }
`;

const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const users = await fetchUsers();
      const user = users.find(u => u.email === email && u.password === password); // simplificado

      if (user) {
        alert('Login bem-sucedido!');
        router.push('/admin'); // caso seja mesma aplicação
      } else {
        alert('Usuário ou senha inválidos');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <FormWrapper onSubmit={handleLogin}>
      <Header>
        <h2>Login</h2>
      </Header>
      <div>
        <Label htmlFor="loginEmail">E-mail:</Label>
        <Input id="loginEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />      
      </div>
      <div>
        <Label htmlFor="loginPassword">Senha:</Label>
        <Input id="loginPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit">Entrar</Button>
      <HelperText>
        <StyledLink onClick={onSwitch}>
          Não tem conta? Cadastre-se
        </StyledLink>
      </HelperText>
      <HelperText>
        <StyledLink color='darkred'>Esqueceu a senha?</StyledLink>
      </HelperText>
      <Link href="/" passHref>
          <IoIosReturnLeft style={{height: 32, width: 32}}/>
      </Link>
    </FormWrapper>
  );
};

export default LoginForm;
