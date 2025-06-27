import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalEspecie from "../components/ModalEspecie/ModalEspecie";
import { normalizarNome } from "../components/Utils/normalizarNome";

export default function Feed() {
  const router = useRouter();
  const [todasEspecies, setTodasEspecies] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch("/Data/data.json");
        const json = await res.json();
        const todas = [...(json.flora || []), ...(json.fauna || [])];
        setTodasEspecies(todas);
      } catch (error) {
        console.error("Erro ao carregar data.json:", error);
      }
    };
    carregar();
  }, []);

  const abrirModal = (nome) => {
    router.push(`/especie/${nome}`, undefined, { shallow: true });
  };

  const fecharModal = () => {
    router.push("/feed", undefined, { shallow: true });
  };

  const nomeEspecieNaURL = router.asPath.startsWith("/especie/")
    ? router.asPath.replace("/especie/", "")
    : null;

  const especiesFiltradas = todasEspecies.filter((especie) =>
    normalizarNome(especie.nome_comum).includes(normalizarNome(busca))
  );

  return (
    <div className="min-h-screen bg-[#B1DABB] p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-900">
        Conheça as Espécies
      </h1>

      {/* Campo de busca */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome comum..."
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800 text-gray-800"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {especiesFiltradas.map((especie) => (
          <div
            key={especie.nome_comum}
            onClick={() => abrirModal(normalizarNome(especie.nome_comum))}
            className="bg-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition p-4"
          >
            <img
              src={especie.imagem}
              alt={especie.nome_comum}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-black">
              {especie.nome_comum}
            </h2>
            <p className="text-gray-700 italic">{especie.nome_cientifico}</p>
            <p className="text-sm text-gray-600 mt-1">{especie.categoria}</p>
          </div>
        ))}
      </div>

      {nomeEspecieNaURL && (
        <ModalEspecie nome={nomeEspecieNaURL} onClose={fecharModal} />
      )}
    </div>
  );
}
