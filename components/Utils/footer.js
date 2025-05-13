// components/Utils/BarraInferior.js
import React from 'react';
import styled from 'styled-components';

const BARRA_ALTURA = 60;

const Barra = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: ${BARRA_ALTURA}px;
  width: 100%;
  background-color: #2e7d32;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  z-index: 5;
`;

const VoltarButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: #2e7d32;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  height: 50px;
  width: 150px;

  &:hover {
    background-color: #e0f2f1;
  }
`;

const BarraInferior = () => {
  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <Barra>
      <VoltarButton onClick={handleVoltar}>Voltar</VoltarButton>
    </Barra>
  );
};

export default BarraInferior;
