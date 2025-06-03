import React, {useState} from 'react';
import styled from 'styled-components';
import { createUser } from '../API/api';
const FormWrapper = styled.form`
  position: relative;
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

const FormularioCadastro = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, email, password });
      alert('Usuário cadastrado com sucesso!');
      onSwitch();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FormWrapper onSubmit={handleRegister}>
      <Header>
        <h2>Cadastro</h2>
      </Header>
      <div>
        <Label htmlFor="name">Nome:</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />      </div>
      <div>
        <Label htmlFor="registerEmail">E-mail:</Label>
        <Input id="registerEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />      </div>
      <div>
        <Label htmlFor="registerPassword">Senha:</Label>
        <Input id="registerPassword" minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />      </div>
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
