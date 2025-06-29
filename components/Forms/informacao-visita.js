import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CampoCurso from "../Utils/cursos";
import { createVisita } from "../API/api";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
  }
`;

const Header = styled.h2`
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #2e7d32;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
  }
`;

const LinhaFlex = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1b5e20;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 100%;
  gap: 1rem;
  @media (min-width: 768px) {
    min-width: 45%;
  }
`;

const ButtonVoltar = styled(Button)`
  background-color: #c62828;
  margin-top: 0.5rem;

  &:hover {
    background-color: #b71c1c;
  }
`;

const FormularioInformacaoVisita = () => {
  const [formData, setFormData] = useState({
    nome: "",
    genero: "",
    acompanhantes: "1",
    curso: "",
    proposito: "",
    estado: "",
    cidade: "",
  });

  const [estados, setEstados] = useState([]);
  const [estadoInput, setEstadoInput] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);

  const [cidades, setCidades] = useState([]);
  const [cidadeInput, setCidadeInput] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);

  useEffect(() => {
    fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    )
      .then((res) => res.json())
      .then(setEstados)
      .catch((err) => console.error("Erro ao buscar estados:", err));
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado.id}/municipios`
      )
        .then((res) => res.json())
        .then(setCidades)
        .catch((err) => console.error("Erro ao buscar cidades:", err));
    } else {
      setCidades([]);
      setCidadeInput("");
      setCidadeSelecionada(null);
    }
  }, [estadoSelecionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEstadoInputChange = (e) => {
    const val = e.target.value;
    setEstadoInput(val);
    setEstadoSelecionado(null);
    setFormData((prev) => ({ ...prev, estado: "" }));
    setCidadeInput("");
    setCidadeSelecionada(null);
    setFormData((prev) => ({ ...prev, cidade: "" }));
  };

  const handleEstadoSelect = (estado) => {
    setEstadoInput(estado.nome);
    setEstadoSelecionado(estado);
    setFormData((prev) => ({ ...prev, estado: estado.nome }));
    setCidadeInput("");
    setCidadeSelecionada(null);
    setFormData((prev) => ({ ...prev, cidade: "" }));
  };

  const handleCidadeInputChange = (e) => {
    const val = e.target.value;
    setCidadeInput(val);
    setCidadeSelecionada(null);
    setFormData((prev) => ({ ...prev, cidade: "" }));
  };

  const handleCidadeSelect = (cidade) => {
    setCidadeInput(cidade.nome);
    setCidadeSelecionada(cidade);
    setFormData((prev) => ({ ...prev, cidade: cidade.nome }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      visitor_name: formData.nome.toUpperCase(),
      gender: formData.genero,
      group_size: parseInt(formData.acompanhantes, 10),
      course: formData.curso.toUpperCase(),
      purpose: formData.proposito.toUpperCase(),
      state: formData.estado.toUpperCase(),
      city: formData.cidade.toUpperCase(),
      country: "BRAZIL",
    };

    try {
      await createVisita(dataToSend);
      alert("Formulário enviado com sucesso!");
      // Se quiser limpar o form:
      setFormData({
        nome: "",
        genero: "",
        acompanhantes: "1",
        curso: "",
        proposito: "",
        estado: "",
        cidade: "",
      });
      setEstadoInput("");
      setEstadoSelecionado(null);
      setCidadeInput("");
      setCidadeSelecionada(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar formulário");
    }
  };

  const handleVoltar = () => {
    window.location.href = "/";
  };

  const dataAtual = new Date().toISOString().split("T")[0];

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Header>Formulário de Informações de Visita</Header>

      <LinhaFlex>
        <Container>
          <Label htmlFor="nome">Nome completo:</Label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Container>

        <Container>
          <Label htmlFor="genero">Gênero:</Label>
          <Select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="FEMININO">Feminino</option>
            <option value="MASCULINO">Masculino</option>
            <option value="OUTRO">Outro</option>
          </Select>
        </Container>
      </LinhaFlex>

      <Container>
        <Label htmlFor="acompanhantes">Quantidade de pessoas no grupo:</Label>
        <Input
          type="number"
          id="acompanhantes"
          name="acompanhantes"
          min={1}
          value={formData.acompanhantes}
          onChange={handleChange}
          required
        />
      </Container>

      <LinhaFlex>
        <Container style={{ position: "relative" }}>
          <Label htmlFor="estado">Estado:</Label>
          <Input
            id="estado"
            name="estado"
            value={estadoInput}
            onChange={handleEstadoInputChange}
            placeholder="Digite o estado"
            autoComplete="off"
            required
          />
          {estadoInput && !estadoSelecionado && (
            <ul
              style={{
                border: "1px solid #ccc",
                maxHeight: "150px",
                overflowY: "auto",
                backgroundColor: "#fff",
                position: "absolute",
                width: "100%",
                zIndex: 10,
                marginTop: 0,
                paddingLeft: 0,
                listStyleType: "none",
              }}
            >
              {estados
                .filter((estado) =>
                  estado.nome.toLowerCase().includes(estadoInput.toLowerCase())
                )
                .map((estado) => (
                  <li
                    key={estado.id}
                    style={{ padding: "4px", cursor: "pointer" }}
                    onClick={() => handleEstadoSelect(estado)}
                  >
                    {estado.nome}
                  </li>
                ))}
            </ul>
          )}
        </Container>

        <Container style={{ position: "relative" }}>
          <Label htmlFor="cidade">Cidade:</Label>
          <Input
            id="cidade"
            name="cidade"
            value={cidadeInput}
            onChange={handleCidadeInputChange}
            disabled={!estadoSelecionado}
            placeholder="Digite a cidade"
            autoComplete="off"
            required
          />
          {cidadeInput && !cidadeSelecionada && (
            <ul
              style={{
                border: "1px solid #ccc",
                maxHeight: "150px",
                overflowY: "auto",
                backgroundColor: "#fff",
                position: "absolute",
                width: "100%",
                zIndex: 10,
                marginTop: 0,
                paddingLeft: 0,
                listStyleType: "none",
              }}
            >
              {cidades
                .filter((cidade) =>
                  cidade.nome.toLowerCase().includes(cidadeInput.toLowerCase())
                )
                .map((cidade) => (
                  <li
                    key={cidade.id}
                    style={{ padding: "4px", cursor: "pointer" }}
                    onClick={() => handleCidadeSelect(cidade)}
                  >
                    {cidade.nome}
                  </li>
                ))}
            </ul>
          )}
        </Container>
      </LinhaFlex>

      <CampoCurso
        value={formData.curso}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, curso: e.target.value }))
        }
      />

      <Container>
        <Label htmlFor="proposito">Propósito da visita:</Label>
        <Input
          type="text"
          id="proposito"
          name="proposito"
          maxLength={100}
          placeholder="Digite o propósito da visita"
          value={formData.proposito}
          onChange={handleChange}
          required
        />
      </Container>

      <Container>
        <Label htmlFor="data">Data da visita:</Label>
        <Input
          type="date"
          id="data"
          name="data"
          defaultValue={dataAtual}
          required
          onChange={() => {}}
          disabled
        />
      </Container>

      <Button type="submit">Enviar</Button>
      <ButtonVoltar onClick={handleVoltar}>Voltar</ButtonVoltar>
    </FormWrapper>
  );
};

export default FormularioInformacaoVisita;
