import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosReturnLeft } from "react-icons/io";
import Link from 'next/link';
import { loginUser } from '../API/api';
import { useRouter } from 'next/router';
import { useToast } from '../Utils/ToastContext';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  width: 100%;
  background-color: #2e7d32;
  border-radius: 6px;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box; /* Garante que o padding não aumente a largura */
  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
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
  transition: background-color 0.2s;

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

const BackLinkWrapper = styled.div`
  margin-top: 1rem;
`;


const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);

      showToast('Login bem-sucedido!', 'success');
      
      setTimeout(() => {
        router.push('/admin');
      }, 1500);

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao fazer login. Tente novamente.';
      showToast(errorMessage, 'error');
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
      <BackLinkWrapper>
        <Link href="/" passHref>
          <IoIosReturnLeft style={{height: 32, width: 32, cursor: 'pointer', color: '#1b5e20'}}/>
        </Link>
      </BackLinkWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
