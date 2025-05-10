import React, { useState } from 'react';
import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 4rem 2rem;
  background: #f9f9f9;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* Menor espaço entre os elementos */
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  color: #555;
  line-height: 1.6; /* Reduzido um pouco também */
  margin: 0; /* Remove margem extra */
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  font-size: 1.75rem;
  color: #34495e;
  margin-top: 1rem;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
  border-radius: 12px;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(44, 62, 80, 0.7);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 10;
  border-radius: 50%;
  
  &:hover {
    background: rgba(44, 62, 80, 0.9);
  }
`;

const PrevButton = styled(CarouselButton)`
  left: 10px;
`;

const NextButton = styled(CarouselButton)`
  right: 10px;
`;

const AboutSection = () => {
  const images = [
    '/imagens/About1.png',
    '/imagens/About2.png',
    '/imagens/About3.png',
    '/imagens/About4.png',
    '/imagens/About5.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <AboutContainer>
      <TextContent>
        <Title>Sobre o Jardim Botânico da UFSM</Title>

        <Paragraph>
          Fundado em 1981, o Jardim Botânico da Universidade Federal de Santa Maria ocupa uma área de 13 hectares dedicada à conservação da biodiversidade e à promoção da educação ambiental.
        </Paragraph>

        <Subtitle>Preservação e Ensino</Subtitle>
        <Paragraph>
          Abrigando cerca de 2.500 indivíduos de 349 espécies nativas, o Jardim também funciona como um laboratório vivo para atividades de ensino, pesquisa e extensão, recebendo estudantes de diversos cursos.
        </Paragraph>

        <Subtitle>Lazer e Comunidade</Subtitle>
        <Paragraph>
          O espaço oferece visitas guiadas, trilhas e oficinas de educação ambiental abertas à comunidade, com entrada gratuita e horários específicos. Para grupos escolares ou institucionais, o agendamento é realizado pelo site oficial.
        </Paragraph>

        <Paragraph>
          O Jardim Botânico da UFSM representa a união entre conservação ambiental, educação e lazer, fortalecendo a formação acadêmica e a conscientização ecológica.
        </Paragraph>
      </TextContent>

      <CarouselContainer>
        <CarouselImage src={images[currentIndex]} alt="Fotos do Jardim Botânico da UFSM" />
        <PrevButton onClick={goToPrevious}>&#10094;</PrevButton>
        <NextButton onClick={goToNext}>&#10095;</NextButton>
      </CarouselContainer>
    </AboutContainer>
  );
};

export default AboutSection;
