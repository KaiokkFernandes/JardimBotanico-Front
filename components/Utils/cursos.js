import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
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

const CampoCurso = ({ value, onChange }) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("/Data/cursos.json");
        const data = await response.json();

        const presenciais = Object.values(data.cursos_presenciais).flat();
        const aDistancia = data.educacao_a_distancia;
        const outros = data.outros;

        const todosCursos = [
          ...new Set([...presenciais, ...aDistancia, ...outros]),
        ].sort();
        setCursos(todosCursos);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  return (
    <Container>
      <Label htmlFor="curso">Curso (Caso seja estudante):</Label>
      <Input
        list="lista-cursos"
        name="curso"
        id="curso"
        value={value}
        onChange={onChange}
      />
      <datalist id="lista-cursos">
        {cursos.map((curso) => (
          <option key={curso} value={curso} />
        ))}
      </datalist>
    </Container>
  );
};

export default CampoCurso;
