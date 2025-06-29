import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('/Imagens/Jardim-Botanico.jpg') center/cover no-repeat fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #AEF6C7;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(33,41,34,0.6) 0%,
      rgba(33,41,34,0.85) 100%
    );
    z-index: 0;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 1rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 4rem);
  margin: 0;
  line-height: 1.2;
  color: #AEF6C7;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  margin: 1.5rem 0 2.5rem;
  color: #F4F7F6;
`;

const Button = styled(motion.a)`
  display: inline-block;
  background: #5B8266;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: background 0.3s ease;

  &:hover {
    background: #3E6259;
  }
`;

const Wave = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  svg {
    display: block;
    width: calc(100% + 1px);
    height: 100px;
  }
  path {
    fill: #496650;
  }
`;

export default function HeroSection() {
  return (
    <HeroContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Jardim Botânico da UFSM
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Um oásis de biodiversidade no coração do Rio Grande do Sul
        </Subtitle>
      </Content>

      <Wave>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C150,100 350,0 600,50 C850,100 1100,0 1200,50 L1200,100 L0,100 Z" />
        </svg>
      </Wave>
    </HeroContainer>
  );
}
