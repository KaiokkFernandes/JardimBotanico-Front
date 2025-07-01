import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// Paleta de cores variada
const cores = [
  "#64B5F6",
  "#81C784",
  "#FFB74D",
  "#BA68C8",
  "#4DB6AC",
  "#F06292",
  "#7986CB",
  "#FFD54F",
  "#AED581",
  "#4DD0E1",
];

const GraficoEstado = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.estado || "NÃO INFORMADO",
    value: item.total,
  }));

  const altura = Math.max(300, chartData.length * 50);

  return (
    <ResponsiveContainer
      style={{ marginRight: 100 }}
      width="100%"
      height={altura}
    >
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 0, left: 100, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 14 }}
        />
        <Tooltip
          cursor={{ fill: "#f5f5f5" }}
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
          }}
        />
        <Bar dataKey="value" barSize={20}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoEstado;
