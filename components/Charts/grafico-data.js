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
import dayjs from "dayjs";

// Paleta suave de cores
const cores = [
  "#4CAF50",
  "#81C784",
  "#A5D6A7",
  "#66BB6A",
  "#388E3C",
  "#FFB74D",
  "#FF8A65",
  "#BA68C8",
  "#7986CB",
  "#64B5F6",
];

const GraficoData = ({ data }) => {
  const contagemDatas = data.reduce((acc, visita) => {
    const dataVisita = visita.data;
    if (!acc[dataVisita]) acc[dataVisita] = 0;
    acc[dataVisita] += visita.total;
    return acc;
  }, {});

  const chartData = Object.entries(contagemDatas).map(([data, total]) => ({
    name: dayjs(data).format("DD/MM/YYYY"),
    value: total,
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
          width={100}
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

export default GraficoData;
