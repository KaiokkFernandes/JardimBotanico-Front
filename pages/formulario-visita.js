import React from 'react';
import styled from 'styled-components';
import FormularioInformacaoVisita from '../components/Forms/informacao-visita';

const MainWrapper = styled.main`
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Page = () => {
  return (
    <MainWrapper>
      <FormularioInformacaoVisita />
    </MainWrapper>
  );
};

export default Page;
