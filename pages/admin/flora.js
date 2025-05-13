import React, { useState, useEffect } from 'react';
import ListaItens from '../../components/Utils/lista';
import BarraInferior from '../../components/Utils/footer';
import BarraSuperior from '../../components/Utils/header';
import styled from 'styled-components';
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

  const handleEdit = (item) => {
    console.log("editei:", item);
    // Aqui você pode abrir um modal com os dados do item
  };

  const handleDelete = (itemId) => {
    console.log("deletei o item com ID:", itemId);
    // Aqui você pode abrir um modal de confirmação de exclusão
  };

   const handleAdd = () => {
    console.log("clicou em adicionar novo item");
    // Aqui você pode abrir um modal, navegar para uma página ou abrir um formulário
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Data/data.json");
        const data = await response.json();
        const itens = [...(data.flora || [])];
        console.log("itens:", itens);
        console.log("itens como JSON:", JSON.stringify(itens, null, 2));

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
        <ListaItens itens={flora} onEdit={handleEdit} onDelete={handleDelete} />
        <Section>
          <BotaoAdicionar onClick={handleAdd}>
            <FaPlus /> Adicionar novo item
          </BotaoAdicionar>
        </Section>
        <BarraInferior />
    </Container>
  );
};

export default PainelFlora;
