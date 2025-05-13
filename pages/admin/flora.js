import React, { useState, useEffect } from 'react';
import ListaItens from '../../components/Utils/lista';
import BarraInferior from '../../components/Utils/footer';
import BarraSuperior from '../../components/Utils/header';
import styled from 'styled-components';
import ModalAdicionarItem from '../../components/Utils/modal-add-item';
import { FaPlus } from 'react-icons/fa';
const Container = styled.div`
    padding-top: 35px; /* evita sobreposição com barra superior */
    padding-bottom: 70px; /* evita sobreposição com barra inferior */
    max-width: 80%;
    margin: 0 auto;
    padding-left: 20%
`;

const Section = styled.section`
    display: flex;
`;

const BotaoAdicionar = styled.button`
    background-color: #2e7d32;
    color: white;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background-color: #256c2b;
    }
`;


const PainelFlora = () => {
    const [flora, setFlora] = useState([]);
    const [showModalForm, setShowModalForm] = useState(false);

    const handleAdd = () => {
        setShowModalForm(true);
        console.log("clicou em adicionar novo item");
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Data/data.json");
        const data = await response.json();
        const itens = [...(data.flora || [])];
        setFlora(itens);
      } catch (error) {
        console.error("Erro ao carregar dados da exposição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
        <BarraSuperior titulo="Painel da Flora" />  
        <ListaItens itens={flora}/>
        <Section>
          <BotaoAdicionar onClick={handleAdd}>
            <FaPlus /> Adicionar novo item
          </BotaoAdicionar>
        </Section>
        {/* Modal de Adicionar */}
        {showModalForm && (
            <ModalAdicionarItem
                isOpen={showModalForm}
                onClose={() => setShowModalForm(false)}
            />
        )}

        <BarraInferior />
    </Container>
  );
};

export default PainelFlora;
