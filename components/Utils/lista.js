import React, { useState } from 'react';
import styled from 'styled-components';
import ModalAdicionarItem from '../../components/Utils/modal-add-item';
import ModalEditarItem from '../../components/Utils/modal-edit-item';
import ModalDeletarItem from '../../components/Utils/modal-delete-item';
const Container = styled.div`
    padding-top: 60px; /* mesmo valor da altura da barra superior */
    width: 75%;
  `;

const Filtro = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
`;

const Lista = styled.ul`
  list-style: none;
  margin-top: 10px;
  padding: 0;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  /* Scrollbar estilizada */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
`;

const Item = styled.li`
  background: #f9f9f9;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

const Imagem = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Info = styled.div`
  flex-grow: 1;
`;

const Nome = styled.h3`
  margin: 0 0 0.3rem 0;
`;

const Cientifico = styled.em`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Desc = styled.p`
  margin: 0;
`;

const Acoes = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Botao = styled.button`
    background: ${({ danger }) => (danger ? '#e74c3c' : '#3498db')};
    color: white;
    width: 100px;
    border: none;
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
    background: ${({ danger }) => (danger ? '#c0392b' : '#2980b9')};
    }
`;

const ListaItens = ({itens}) => {
    const [filtro, setFiltro] = useState('');
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);

    const handleEdit = (item) => {
        setItemSelecionado(item);
        setShowModalForm(true);
    };

    const handleDelete = (itemId) => {
        const item = itens.find(f => f.id === itemId.id);
        setItemSelecionado(item);
        console.log("tentando deletar:", itemSelecionado)
        setShowModalDelete(true);
    };

  const itensFiltrados = itens.filter((item) => {
    const termo = filtro.toLowerCase();
    return (
      item.nome_comum?.toLowerCase().includes(termo) ||
      item.nome_cientifico?.toLowerCase().includes(termo)
    );
  });

  return (
    <Container>
        <div style={{textAlign: "center"}}>
            <Filtro
            type="text"
            placeholder="Filtrar por nome comum ou científico..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            />
        </div>
        <Lista>
        {itensFiltrados.map((item) => (
            <Item key={item.id}>
            {item.imagem && (
                <Imagem
                src={item.imagem.startsWith('http') ? item.imagem : `/images/${item.imagem}`}
                alt={item.nome_comum}
                />
            )}
            <Info>
                <Nome>{item.nome_comum}</Nome>
                <Cientifico>{item.nome_cientifico}</Cientifico>
                <Desc>{item.descricao}</Desc>
            </Info>
            <Acoes>
                <Botao onClick={() => handleEdit(item)}>Editar</Botao>
                <Botao danger onClick={() => handleDelete(item)}>Excluir</Botao>
            </Acoes>
            </Item>
        ))}
        </Lista>
        {showModalForm && (
        <ModalEditarItem
            isOpen={showModalForm}
            item={itemSelecionado}
            onClose={() => {
            setShowModalForm(false);
            setItemSelecionado(null);
            }}
            onSubmit={(updatedItem) => {
            onEdit(updatedItem);
            setShowModalForm(false);
            setItemSelecionado(null);
            }}
            
        />
        
        )}
        {showModalDelete && (
        <ModalDeletarItem
            isOpen={showModalDelete}
            onClose={() => {
                setShowModalDelete(false);
                setItemSelecionado(null);
            }}
            onConfirm={() => {
                onDelete(itemSelecionado.id);
                setShowModalDelete(false);
                setItemSelecionado(null);
            }}
            item={itemSelecionado}
        />
        )}
    </Container>
  );
};

export default ListaItens;
