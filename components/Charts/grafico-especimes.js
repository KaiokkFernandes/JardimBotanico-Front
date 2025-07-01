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

const GraficoEspecimes = ({ totalFauna = 0, totalFlora = 0, total = 0 }) => {
  const data = [
    { tipo: "Fauna", total: totalFauna ?? 0 },
    { tipo: "Flora", total: totalFlora ?? 0 },
    { tipo: "Total", total: total ?? totalFauna + totalFlora },
  ];

  const cores = ["#4caf50", "#81c784", "#388e3c"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tipo" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="total">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoEspecimes;
