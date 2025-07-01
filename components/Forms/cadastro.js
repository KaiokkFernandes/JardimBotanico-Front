import React, { useState } from 'react';
import styled from 'styled-components';
import { createUser } from '../API/api';
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
  box-sizing: border-box;
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

const FormularioCadastro = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('A senha deve ter no mínimo 6 caracteres.', 'error');
      return;
    }
    try {
      await createUser({ name, email, password });
      
      showToast('Usuário cadastrado com sucesso!', 'success');

      setTimeout(() => {
        onSwitch();
      }, 1500);

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao cadastrar usuário. Verifique os dados.';
      showToast(errorMessage, 'error');
    }
  };

  return (
    <FormWrapper onSubmit={handleRegister}>
      <Header>
        <h2>Cadastro</h2>
      </Header>
      <div>
        <Label htmlFor="name">Nome:</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="registerEmail">E-mail:</Label>
        <Input id="registerEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="registerPassword">Senha:</Label>
        <Input id="registerPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit">Cadastrar</Button>
      <HelperText>
        <StyledLink onClick={onSwitch}>
          Já tem conta? Fazer login
        </StyledLink>
      </HelperText>
    </FormWrapper>
  );
};

export default FormularioCadastro;
