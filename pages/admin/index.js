import React from "react";
import styled from "styled-components";
import { FaPaw, FaLeaf, FaChartPie } from "react-icons/fa";
import Link from "next/link";

const BARRA_ALTURA = 60;

const BarraSuperior = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${BARRA_ALTURA}px;
  width: 100%;
  background-color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 5;
`;

const BarraInferior = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: ${BARRA_ALTURA}px;
  width: 100%;
  background-color: #2e7d32;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  z-index: 5;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${BARRA_ALTURA * 2}px);
  padding-top: ${BARRA_ALTURA}px;
  padding-bottom: ${BARRA_ALTURA}px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.a`
  background-color: #f5f5f5;
  height: 300px;
  display: grid;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: #e8f5e9;
  }

  svg {
    font-size: 2.5rem;
    color: #2e7d32;
    margin-bottom: 0.5rem;
  }
`;

const VoltarButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: #2e7d32;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  height: 50px;
  width: 150px;

  &:hover {
    background-color: #e0f2f1;
  }
`;

const Label = styled.h2`
  margin-top: 3em;
`;

const ContainerIcone = styled.div`
  margin-top: 5em;
  justify-self: center;
`;

const AdminLandingPage = () => {
  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <>
      <BarraSuperior>
        <h1>Jardim Botânico UFSM</h1>
      </BarraSuperior>

      <Container>
        <CardContainer>
          <Link href="/admin/fauna" passHref legacyBehavior>
            <Card>
              <ContainerIcone>
                <FaPaw style={{ height: 64, width: 64 }} />
              </ContainerIcone>
              <Label>Fauna</Label>
            </Card>
          </Link>

          <Link href="/admin/flora" passHref legacyBehavior>
            <Card>
              <ContainerIcone>
                <FaLeaf style={{ height: 64, width: 64 }} />
              </ContainerIcone>
              <Label>Flora</Label>
            </Card>
          </Link>

          <Link href="/admin/graficos" passHref legacyBehavior>
            <Card>
              <ContainerIcone>
                <FaChartPie style={{ height: 64, width: 64 }} />
              </ContainerIcone>
              <Label>Gráficos & Informações</Label>
            </Card>
          </Link>
        </CardContainer>
      </Container>
    </>
  );
};

export default AdminLandingPage;
