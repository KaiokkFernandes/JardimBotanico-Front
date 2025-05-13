import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Titulo = styled.h2`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin: 0.5rem 0 0.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.8rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  height: 80px;
  margin-bottom: 0.8rem;
`;

const Preview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-top: 0.5rem;
  border-radius: 8px;
`;

const Botoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Botao = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) => props.cancelar ? "#ccc" : "#2e7d32"};
  color: ${(props) => props.cancelar ? "black" : "white"};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ModalAdicionarItem = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    curiosidade: '',
    categoria: '',
    habitat: '',
    descricao: '',
    foto: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, foto: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const novoItem = {
      ...formData,
      id: Date.now(),
      preview: previewUrl, // para exibir depois
    };
    onSubmit(novoItem);
    onClose();
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Titulo>Adicionar Novo Item da Flora</Titulo>

        <Label>Foto</Label>
        <Input type="file" accept="image/*" onChange={handleFotoChange} />
        {previewUrl && <Preview src={previewUrl} alt="Prévia da imagem" />}

        <Label>Nome</Label>
        <Input name="nome" value={formData.nome} onChange={handleChange} />

        <Label>Curiosidade</Label>
        <Input name="curiosidade" value={formData.curiosidade} onChange={handleChange} />

        <Label>Categoria</Label>
        <Input name="categoria" value={formData.categoria} onChange={handleChange} />

        <Label>Habitat</Label>
        <Input name="habitat" value={formData.habitat} onChange={handleChange} />

        <Label>Descrição</Label>
        <TextArea name="descricao" value={formData.descricao} onChange={handleChange} />

        <Botoes>
          <Botao cancelar onClick={onClose}>Cancelar</Botao>
          <Botao onClick={handleSubmit}>Adicionar</Botao>
        </Botoes>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalAdicionarItem;
