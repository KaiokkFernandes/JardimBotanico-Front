import React, { useEffect, useState, useRef } from "react";
import {
  getEstatisticaEstados,
  getEstatisticaCursos,
  getEstatisticaGenero,
  getEstatisticaDias,
  getTotalVisitas,
} from "../../components/API/api";

import GraficoGenero from "../../components/Charts/grafico-genero";
import GraficoEstado from "../../components/Charts/grafico-estado";
import GraficoData from "../../components/Charts/grafico-data";
import GraficoCursos from "../../components/Charts/grafico-curso";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const containerStyle = {
  padding: "2rem",
  fontFamily: "'Segoe UI', sans-serif",
  backgroundColor: "#f4f6f8",
  minHeight: "100vh",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "#333",
  marginBottom: "3rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  gap: "2rem",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const subtitleStyle = {
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "1rem",
  color: "#2e7d32",
  textTransform: "uppercase",
  letterSpacing: "0.05rem",
};

function PainelGraficos() {
  const [dadosGenero, setDadosGenero] = useState([]);
  const [dadosCursos, setDadosCursos] = useState([]);
  const [dadosEstados, setDadosEstados] = useState([]);
  const [dadosDias, setDadosDias] = useState([]);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [totalVisitas, setTotalVisitas] = useState(null);

  useEffect(() => {
    getEstatisticaGenero().then(setDadosGenero).catch(console.error);
    getEstatisticaCursos().then(setDadosCursos).catch(console.error);
    getEstatisticaEstados().then(setDadosEstados).catch(console.error);
    getEstatisticaDias().then(setDadosDias).catch(console.error);
  }, []);
  useEffect(() => {
    getTotalVisitas(ano).then(setTotalVisitas).catch(console.error);
  }, [ano]); // <- reexecuta toda vez que `ano` mudar

  const totalRef = useRef();
  const generoRef = useRef();
  const cursosRef = useRef();
  const estadoRef = useRef();
  const dataRef = useRef();

  const exportarPDF = async () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const refs = [totalRef, generoRef, cursosRef, estadoRef, dataRef];

    for (let i = 0; i < refs.length; i++) {
      const canvas = await html2canvas(refs[i].current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(
        pageWidth / canvas.width,
        pageHeight / canvas.height
      );

      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      if (i < refs.length - 1) {
        pdf.addPage();
      }
    }

    pdf.save("dashboard-visitas.pdf");
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>📈 Dashboard de Visitas</h2>

      {/* Card de Total de Visitas */}
      <div
        ref={totalRef}
        style={{ ...cardStyle, marginBottom: "2rem", textAlign: "center" }}
      >
        <h3 style={subtitleStyle}>Total de Visitas no Ano</h3>
        <div
          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2e7d32" }}
        >
          {totalVisitas !== null ? totalVisitas : "Carregando..."}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="ano">Ano:</label>
          <input
            id="ano"
            type="number"
            value={ano}
            onChange={(e) => setAno(parseInt(e.target.value))}
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100px",
            }}
          />
        </div>
      </div>

      <div style={gridStyle}>
        <div ref={generoRef} style={cardStyle}>
          <h3 style={subtitleStyle}>Distribuição por Gênero</h3>
          <GraficoGenero data={dadosGenero} />
        </div>

        <div ref={cursosRef} style={cardStyle}>
          <h3 style={subtitleStyle}>Cursos Mais Visitados</h3>
          <GraficoCursos data={dadosCursos} />
        </div>

        <div ref={estadoRef} style={cardStyle}>
          <h3 style={subtitleStyle}>Estados com Mais Visitas</h3>
          <GraficoEstado data={dadosEstados} />
        </div>

        <div ref={dataRef} style={cardStyle}>
          <h3 style={subtitleStyle}>Visitas por Dia</h3>
          <GraficoData data={dadosDias} />
        </div>
        <button
          onClick={exportarPDF}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#1565c0",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          🖨️ Imprimir Dashboard
        </button>
      </div>
    </div>
  );
}

export default PainelGraficos;
