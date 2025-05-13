// components/Utils/BarraSuperior.js
import React from 'react';
import styled from 'styled-components';

const BARRA_ALTURA = 60;

const Barra = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${BARRA_ALTURA}px;
  width: 100%;
  background-color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 5;
`;

const BarraSuperior = ({ titulo }) => {
  return (
    <Barra>
      <h1>{titulo}</h1>
    </Barra>
  );
};

export default BarraSuperior;
