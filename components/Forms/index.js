import React from "react";
import styled from "styled-components";
import { FaAddressBook, FaCalendarCheck, FaCalendarAlt } from 'react-icons/fa';
import { FaFilePen } from "react-icons/fa6";


const Section = styled.section`
  padding: 3rem 2rem;
  background: #ffffff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const IconGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
`;

const IconCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4caf50;
  text-decoration: none;
  transition: transform 0.3s;
  width: 180px;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    font-size: 4rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1rem;
    color: black;
    border-top: 2px solid black;
    padding-top: 0.5rem;
  }
`;

const UtilidadesSection = () => {
  return (
    <Section>
      <Title>Utilidades</Title>
      <IconGrid>
        <IconCard href="https://www.ufsm.br/orgaos-suplementares/jardim-botanico/agendamentos" target="_blank">
          <FaAddressBook />
          <span>Agendamento de visitas</span>
        </IconCard>
        <IconCard href="https://docs.google.com/forms/d/e/1FAIpQLSeuJQHweH6KzWk_PBFHJytr7aTfmjD2mKKFL0vpm8hnZRlKHQ/viewform" target="_blank">
          <FaCalendarCheck />
          <span>Solicitações à Direção do JBSM</span>
        </IconCard>
        <IconCard href="https://docs.google.com/forms/d/e/1FAIpQLSeuJQHweH6KzWk_PBFHJytr7aTfmjD2mKKFL0vpm8hnZRlKHQ/viewform" target="_blank">
          <FaCalendarAlt />
          <span>Agendamento do Auditório</span>
        </IconCard>
        <IconCard href="/formulario-visita" target="_blank">
          <FaFilePen />
          <span>Fornecer Informações da Visita</span>
        </IconCard>
      </IconGrid>
    </Section>
  );
};

export default UtilidadesSection;
