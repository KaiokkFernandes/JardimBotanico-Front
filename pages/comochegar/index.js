import React from 'react';
import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { FaCarSide, FaWalking } from 'react-icons/fa';

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #AEF6C7 0%, #5B8266 100%);
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #212922;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #294936;
    border-radius: 2px;
    margin: 1rem auto 0;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  svg {
    flex-shrink: 0;
    font-size: 1.5rem;
    color: #3E6259;
    margin-right: 1rem;
  }

  p {
    margin: 0;
    color: #212922;
    font-size: 1rem;
    line-height: 1.6;

    strong {
      color: #212922;
    }
  }
`;

const MapWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  height: 450px;
`;

export default function ComoChegar() {
  return (
    <Section>
      <Title>Como Chegar</Title>

      <Content>
        <Card>
          <Step>
            <FiMapPin />
            <p>
              <strong>Endereço:</strong><br/>
              Av. Roraima, 1000 – Camobi, Santa Maria – RS, 97105-900, Brasil
            </p>
          </Step>

          <Step>
            <FaCarSide />
            <p>
              <strong>Entrada Principal:</strong><br/>
              Siga pela rua atrás do prédio 21.
            </p>
          </Step>

          <Step>
            <FaWalking />
            <p>
              <strong>Entrada Secundária:</strong><br/>
              Na rotatória da BR-287, pegue a Estrada Geral Pará Arroio do Sol até o destino.
            </p>
          </Step>
        </Card>

        <MapWrapper>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.0262221939684!2d-53.73203352392047!3d-29.71899967508901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9503b5fb8ce36ee5%3A0xa57b162c6dfaa433!2sJardim%20Bot%C3%A2nico%20de%20Santa%20Maria!5e0!3m2!1spt-BR!2sbr!4v1747154291405!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapWrapper>
      </Content>
    </Section>
  );
}
