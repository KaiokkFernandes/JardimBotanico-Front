import React from 'react';
import styled from 'styled-components';
import CampoCurso from '../Utils/cursos';
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  text-align: center;
  color: #2e7d32;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 100%;
  gap: 1rem;
  @media (min-width: 768px) {
    min-width: 45%;
  }
`;

const FormularioInformacaoVisita = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário de visita enviado');
  };

  const dataAtual = new Date().toISOString().split('T')[0];

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Header>Formulário de Informações de Visita</Header>

      <Container>
        <Label htmlFor="nome">Nome completo:</Label>
        <Input type="text" id="nome" name="nome" required />
      </Container>

      <Container>
        <Label htmlFor="acompanhantes">Quantidade de pessoas no grupo:</Label>
        <Input type="number" id="acompanhantes" name="acompanhantes" min={1} required />
      </Container>

      <Container>
        <Label htmlFor="cidade">Cidade de origem:</Label>
        <Input type="text" id="cidade" name="cidade" required />
      </Container>

      <CampoCurso />

      <Container>
        <Label htmlFor="data">Data da visita:</Label>
        <Input type="date" id="data" name="data" defaultValue={dataAtual} required />
      </Container>

      <Button type="submit">Enviar</Button>
    </FormWrapper>
  );
};

export default FormularioInformacaoVisita;
