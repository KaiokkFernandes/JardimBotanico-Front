import React, { useState } from "react";
import styled from "styled-components";
import { createEspecime } from "../API/api";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
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

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomFileButton = styled.label`
  padding: 0.5rem 1rem;
  background-color: #2e7d32;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #276a27;
  }
`;

const FileName = styled.span`
  font-size: 0.9rem;
  color: #555;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  background: ${(props) => (props.cancelar ? "#ccc" : "#2e7d32")};
  color: ${(props) => (props.cancelar ? "black" : "white")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ModalAdicionarItem = ({ isOpen, onClose, FaunaOrFlora }) => {
  const [formData, setFormData] = useState({
    nome: "",
    nome_cientifico: "",
    curiosidade: "",
    categoria: "",
    habitat: "",
    descricao: "",
    foto: "",
    tipo: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, foto: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setFileName("");
      setPreviewUrl(null);
    }
  };


  const handleSubmit = async () => {
    try {
      const novoItem = {
        name: formData.nome,
        scientific_name: formData.nome_cientifico,
        curiosity: formData.curiosidade,
        category: formData.categoria,
        habitat: formData.habitat,
        description: formData.descricao,
        image_url: fileName || "",
        specimen_type: FaunaOrFlora,
      };

      const resposta = createEspecime(novoItem); // Envia para o back-end
      onClose();
    } catch (err) {
      console.error("Erro ao criar espécime:", err);
      alert("Erro ao criar espécime. Tente novamente.");
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Titulo>Adicionar Novo Item da {FaunaOrFlora}</Titulo>

        <FileInputWrapper>
          <HiddenFileInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
          />
          <CustomFileButton htmlFor="file-upload">
            Selecionar Imagem
          </CustomFileButton>
          <FileName>{fileName|| "Nenhum arquivo selecionado"}</FileName>

          {previewUrl && (
            <Preview
              style={{ width: 200, height: 200 }}
              src={previewUrl}
              alt="Prévia da imagem"
            />
          )}
        </FileInputWrapper>

        <Label>Nome</Label>
        <Input name="nome" value={formData.nome} onChange={handleChange} />

        <Label>Nome científico</Label>
        <Input
          name="nome_cientifico"
          value={formData.nome_cientifico}
          onChange={handleChange}
        />

        <Label>Curiosidade</Label>
        <Input
          name="curiosidade"
          value={formData.curiosidade}
          onChange={handleChange}
        />

        <Label>Categoria</Label>
        <Input
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />

        <Label>Habitat</Label>
        <Input
          name="habitat"
          value={formData.habitat}
          onChange={handleChange}
        />

        <Label htmlFor="tipo">Tipo</Label>
        <Input
          type="text"
          id="tipo"
          className="form-control"
          value={FaunaOrFlora}
          readOnly
          disabled
          style={{
            backgroundColor: "#e9ecef",
            color: "rgb(170, 171, 171)",
          }}
        />

        <Label>Descrição</Label>
        <TextArea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />

        <Botoes>
          <Botao style={{backgroundColor: "darkred"}}onClick={onClose}>
            Cancelar
          </Botao>
          <Botao onClick={handleSubmit}>Adicionar</Botao>
        </Botoes>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalAdicionarItem;
