import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaAddressBook, FaCalendarCheck, FaCalendarAlt } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";

const palette = {
  dark1: '#212922',
  dark2: '#294936',
  mid:   '#3E6259',
  light: '#5B8266',
  accent:'#AEF6C7',
};

const Section = styled.section`
  position: relative;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, ${palette.accent} 0%, ${palette.light} 100%);
  overflow: hidden;
`;

// Blob orgânico de fundo
const blobPath = `M42.8,-72.3C57.5,-62.1,73.9,-57.6,78.9,-47.1C83.9,-36.6,77.6,-20.2,73.1,-4.1C68.6,12,65.8,26.1,59.6,37.8C53.4,49.5,43,58.8,31.2,65.8C19.4,72.8,6.2,77.3,-6.5,81.3C-19.2,85.3,-38.5,88.9,-50.5,82.7C-62.6,76.4,-67.2,60.3,-72.5,45.1C-77.8,29.9,-83.8,15,-82.6,0.7C-81.3,-13.6,-72.8,-27.2,-64.3,-39.4C-55.8,-51.7,-47.2,-62.6,-35.6,-71.1C-24,-79.7,-12,-85.8,2.1,-89C16.3,-92.2,32.6,-92.5,42.8,-72.3Z`;

const Blob = styled.svg`
  position: absolute;
  top: -20%;
  left: -10%;
  width: 130%;
  height: 130%;
  fill: rgba(62,98,89, 0.2);
  z-index: 0;
  pointer-events: none;
`;
const Title = styled(motion.h2)`
  position: relative;
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  color: ${palette.dark1};
  text-align: center;
  margin-bottom: 3rem;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${palette.dark2};
    border-radius: 2px;
  }
`;

const Grid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
`;

const Card = styled(motion.a)`
  background: rgba(33,41,34, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(33,41,34, 0.2);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-decoration: none;
  color: ${palette.dark1};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${palette.mid};
  }

  span {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }
`;

const data = [
  {
    icon: <FaAddressBook />, label: "Agendamento de visitas",
    href: "https://www.ufsm.br/orgaos-suplementares/jardim-botanico/agendamentos",
  },
  {
    icon: <FaCalendarCheck />, label: "Solicitações à Direção",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeuJQHweH6KzWk_PBFHJytr7aTfmjD2mKKFL0vpm8hnZRlKHQ/viewform",
  },
  {
    icon: <FaCalendarAlt />, label: "Agendamento do Auditório",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeuJQHweH6KzWk_PBFHJytr7aTfmjD2mKKFL0vpm8hnZRlKHQ/viewform",
  },
  {
    icon: <FaFilePen />, label: "Fornecer Info. da Visita",
    href: "/formulario-visita",
  },
];

export default function UtilidadesSection() {
  return (
    <Section>
      <Blob viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={blobPath} />
      </Blob>

      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Utilidades
      </Title>

      <Grid>
        {data.map((item, idx) => (
          <Card
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener"
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
