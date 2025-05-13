import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  text-align: center;
`;

const Titulo = styled.h2`
  margin-bottom: 1rem;
`;

const Botoes = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Botao = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) => props.cancelar ? "#ccc" : "#c62828"};
  color: ${(props) => props.cancelar ? "black" : "white"};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ModalDeletarItem = ({ isOpen, onClose, onConfirm, item }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <Titulo>Confirmar Exclusão</Titulo>
        <p>Você realmente deseja excluir <strong>{item?.nome_comum}</strong> do acervo?</p>
        <Botoes>
          <Botao cancelar onClick={onClose}>Cancelar</Botao>
          <Botao onClick={() => { onConfirm(item.id); onClose(); }}>
            Confirmar
          </Botao>
        </Botoes>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalDeletarItem;
