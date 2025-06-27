import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CampoCurso from "../Utils/cursos";
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
  const [estados, setEstados] = useState([]);
  const [estadoInput, setEstadoInput] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);

  const [cidades, setCidades] = useState([]);
  const [cidadeInput, setCidadeInput] = useState("");

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
    }
  }, [estadoSelecionado]);

  const handleEstadoChange = (e) => {
    setEstadoSelecionado(e.target.value);
    setCidadeSelecionada("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário de visita enviado");
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
          <Input type="text" id="nome" name="nome" required />
        </Container>

        <Container>
          <Label htmlFor="acompanhantes">Quantidade de pessoas no grupo:</Label>
          <Input
            type="number"
            id="acompanhantes"
            name="acompanhantes"
            min={1}
            required
          />
        </Container>
      </LinhaFlex>
      <LinhaFlex>
        <Container>
          <Label htmlFor="estado">Estado:</Label>
          <Input
            id="estado"
            value={estadoInput}
            onChange={(e) => {
              setEstadoInput(e.target.value);
              setEstadoSelecionado(null); // reseta a cidade
            }}
            placeholder="Digite o estado"
            autoComplete="off"
          />
          {estadoInput && !estadoSelecionado && (
            <ul
              style={{
                border: "1px solid #ccc",
                maxHeight: "150px",
                overflowY: "auto",
                backgroundColor: "#fff",
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
                    onClick={() => {
                      setEstadoInput(estado.nome);
                      setEstadoSelecionado(estado);
                    }}
                  >
                    {estado.nome}
                  </li>
                ))}
            </ul>
          )}
        </Container>

        <Container>
          <Label htmlFor="cidade">Cidade:</Label>
          <Input
            id="cidade"
            value={cidadeInput}
            onChange={(e) => setCidadeInput(e.target.value)}
            disabled={!estadoSelecionado}
            placeholder="Digite a cidade"
            autoComplete="off"
          />
          {cidadeInput && (
            <ul
              style={{
                border: "1px solid #ccc",
                maxHeight: "150px",
                overflowY: "auto",
                backgroundColor: "#fff",
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
                    onClick={() => setCidadeInput(cidade.nome)}
                  >
                    {cidade.nome}
                  </li>
                ))}
            </ul>
          )}
        </Container>
      </LinhaFlex>
      <CampoCurso />

      <Container>
        <Label htmlFor="data">Data da visita:</Label>
        <Input
          type="date"
          id="data"
          name="data"
          defaultValue={dataAtual}
          required
        />
      </Container>

      <Button type="submit">Enviar</Button>
      <ButtonVoltar onClick={handleVoltar}>Voltar</ButtonVoltar>
    </FormWrapper>
  );
};

export default FormularioInformacaoVisita;
