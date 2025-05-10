import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";
import { FiVolume2 } from "react-icons/fi";

const CardContainer = styled.div`
  max-width: 350px;
  margin: 1rem auto;
  padding: 1rem;
  background: #f9f9f9;
  border: 2px solid #333;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-family: "Arial", sans-serif;
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const TitleSection = styled.div`
  text-align: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative; /* Para posicionar o ícone no canto */
`;

const CommonName = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 1.3rem;
`;

const ScientificName = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 0.9rem;
`;

const SpeakButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  
  /* Ao passar o mouse */
  &:hover {
    color: #007bff;
  }
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  max-width: 220px;
  margin: 0.5rem auto;
  border: 2px solid #aaa;
  border-radius: 8px;
`;

const InfoText = styled.p`
  margin: 0.25rem 0;
  line-height: 1.4;
`;

const SubTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  border-top: 2px solid #ddd;
  padding-top: 0.5rem;
`;

const CuriositiesList = styled.ul`
  list-style: circle;
  margin: 0.5rem 1rem;
  padding: 0;
  line-height: 1.4;
`;

const QrCodeWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

function PlantPage() {
  const { index } = useParams();
  const [exposicao, setExposicao] = useState([]);
  const [planta, setPlanta] = useState(null);

  useEffect(() => {
    fetch("/Data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setExposicao(data.exposicao);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);
  

  useEffect(() => {
    if (exposicao.length > 0) {
      setPlanta(exposicao[index]);
    }
  }, [exposicao, index]);

  if (!planta) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Carregando...</div>;
  }


  const imageUrl = `/imagens/${planta.imagem}`;
  const currentUrl = window.location.href;

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
  
    // Se estiver falando, cancela a fala atual
    if (synth.speaking) {
      synth.cancel();
      return;
    }
  
    const textToSpeak = `
      ${planta.nome_comum},
      Nome científico: ${planta.nome_cientifico}.
      Categoria: ${planta.categoria}.
      Descrição: ${planta.descricao}.
      Habitat: ${planta.habitat}.
      Curiosidades: ${planta.curiosidades ? planta.curiosidades.join(". ") : ""}
    `;
  
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "pt-BR";
    synth.speak(utterance);
  };
  
  

  return (
    <CardContainer>
      <TitleSection>
        <CommonName>{planta.nome_comum}</CommonName>
        <ScientificName>{planta.nome_cientifico}</ScientificName>

        <SpeakButton onClick={handleSpeak} title="Clique para ouvir a descrição">
          <FiVolume2 />
        </SpeakButton>
      </TitleSection>

      <CardImage src={imageUrl} alt={planta.nome_comum} />

      <InfoText>
        <strong>Categoria: </strong>{planta.categoria}
      </InfoText>
      <InfoText>{planta.descricao}</InfoText>
      <InfoText>
        <strong>Habitat: </strong>{planta.habitat}
      </InfoText>

      {planta.curiosidades && planta.curiosidades.length > 0 && (
        <>
          <SubTitle>Curiosidades</SubTitle>
          <CuriositiesList>
            {planta.curiosidades.map((curiosidade, i) => (
              <li key={i}>{curiosidade}</li>
            ))}
          </CuriositiesList>
        </>
      )}
      <QrCodeWrapper>
        <QRCodeCanvas value={currentUrl} size={128} />
      </QrCodeWrapper>
    </CardContainer>
  );
}

export default PlantPage;
