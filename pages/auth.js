import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import FormularioLogin from '../components/Forms/login';
import FormularioCadastro from '../components/Forms/cadastro';

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f1f1f1;
`;

const SlideWrapper = styled.div`
  width: 300px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Slides = styled.div`
  display: flex;
  width: 600px;
  transition: transform 0.4s ease-in-out;
  ${({ active }) =>
    active === 'register' &&
    css`
      transform: translateX(-50%);
    `}
`;

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <Container>
      <SlideWrapper>
        <Slides active={activeForm}>
          <div style={{ width: '300px', padding: '2rem' }}>
            <FormularioLogin onSwitch={() => setActiveForm('register')} />
          </div>
          <div style={{ width: '300px', padding: '2rem' }}>
            <FormularioCadastro onSwitch={() => setActiveForm('login')} />
          </div>
        </Slides>
      </SlideWrapper>
    </Container>
  );
};

export default AuthPage;
