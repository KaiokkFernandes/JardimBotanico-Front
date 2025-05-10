import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/Imagens/Jardim-Botanico.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroSection = () => (
  <HeroContainer>
    <div>
      <h1>Jardim Botânico da UFSM</h1>
      <p>Um oásis de biodiversidade no coração do Rio Grande do Sul</p>
    </div>
  </HeroContainer>
);

export default HeroSection;