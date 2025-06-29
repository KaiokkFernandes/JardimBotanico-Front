// components/AboutSection.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const AboutContainer = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #5B8266, #212922);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  align-items: start;
`;

const TextCard = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: #2e3e2f;
`;

const Subtitle = styled.h4`
  margin: 1.5rem 0 0.5rem;
  font-size: 1.25rem;
  color: #3b4a3a;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 4px;
    background: #79a06e;
    border-radius: 2px;
  }
`;

const Paragraph = styled.p`
  margin: 0.75rem 0;
  line-height: 1.6;
  color: #555;
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
`;

const CarouselInner = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar { display: none; }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  img {
    display: block;
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(44,62,80,0.6);
  border: none;
  color: #fff;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  &:hover { background: rgba(44,62,80,0.9); }
`;
const Prev = styled(NavButton)` left: 10px; `;
const Next = styled(NavButton)` right: 10px; `;

export default function AboutSection() {
  const images = [
    '/Imagens/About1.png',
    '/Imagens/About2.png',
    '/Imagens/about3.png',
    '/Imagens/About4.png',
    '/Imagens/About5.png',
  ];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  const innerRef = React.useRef();
  React.useEffect(() => {
    const el = innerRef.current;
    if (el) {
      el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    }
  }, [index]);

  return (
    <AboutContainer>
      <TextCard
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Title>Sobre o Jardim Botânico da UFSM</Title>
        <Paragraph>
          Fundado em 1981, o Jardim Botânico da UFSM ocupa 13 hectares dedicados à
          conservação da biodiversidade e à promoção da educação ambiental.
        </Paragraph>
        <Subtitle>Preservação e Ensino</Subtitle>
        <Paragraph>
          Abriga cerca de 2.500 indivíduos de 349 espécies nativas, servindo como
          laboratório vivo para pesquisa, ensino e extensão.
        </Paragraph>
        <Subtitle>Lazer e Comunidade</Subtitle>
        <Paragraph>
          Oferece visitas guiadas, trilhas e oficinas gratuitas para a comunidade,
          com agendamento online disponível para grupos escolares e institucionais.
        </Paragraph>
      </TextCard>

      <CarouselContainer>
        <Prev onClick={prev} aria-label="Anterior">
          <MdChevronLeft size={24} />
        </Prev>
        <Next onClick={next} aria-label="Próxima">
          <MdChevronRight size={24} />
        </Next>

        <CarouselInner ref={innerRef}>
          {images.map((src, i) => (
            <Slide key={i}>
              <img src={src} alt={`Jardim Botânico foto ${i + 1}`} />
            </Slide>
          ))}
        </CarouselInner>
      </CarouselContainer>
    </AboutContainer>
  );
}
