import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalEspecie from "../components/ModalEspecie/ModalEspecie";
import { normalizarNome } from "../components/Utils/normalizarNome";

export default function Feed() {
  const router = useRouter();
  const [todasEspecies, setTodasEspecies] = useState([]);
  const [busca, setBusca] = useState("");
  const [hoverEspecie, setHoverEspecie] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    <div className="min-h-screen bg-[#B1DABB] p-6 relative overflow-x-hidden">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-900">
        Conheça as Espécies
      </h1>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome comum..."
          
          className="
          w-full p-3 rounded-lg border border-green-900 outline outline-1 
          outline-green-900 shadow-sm focus:outline-2 focus:outline-green-900 
          focus:border-green-900 text-gray-800 placeholder-green-900
          "
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {especiesFiltradas.map((especie) => (
          <div
            key={especie.nome_comum}
            onClick={() =>
              abrirModal(normalizarNome(especie.nome_comum))
            }
            onMouseEnter={() => setHoverEspecie(especie)}
            onMouseLeave={() => setHoverEspecie(null)}
            onMouseMove={(e) =>
              setMousePos({ x: e.clientX + 20, y: e.clientY + 20 })
            }
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

      {/* Tooltip flutuante que segue o mouse */}
      {hoverEspecie && (
        <div
          className="hidden md:block fixed z-50 bg-white rounded-2xl shadow-2xl p-4 w-80 transition-opacity duration-200 pointer-events-none"
          style={{
            top: `${mousePos.y}px`,
            left: `${mousePos.x}px`,
            transform: "translate(0, 0)", // opcional: ajuste fino
          }}
        >
          <img
            src={hoverEspecie.imagem}
            alt={hoverEspecie.nome_comum}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <h3 className="text-lg font-bold text-black mb-1">
            {hoverEspecie.nome_comum}
          </h3>
          <p className="text-sm italic text-gray-700 mb-2">
            {hoverEspecie.nome_cientifico}
          </p>
          <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-5">
            {hoverEspecie.texto}
          </p>
          <button
            onClick={() =>
              abrirModal(normalizarNome(hoverEspecie.nome_comum))
            }
            className="mt-3 bg-green-800 text-white px-3 py-1 rounded hover:bg-green-900 transition"
          >
            Ver mais
          </button>
        </div>
      )}

      {nomeEspecieNaURL && (
        <ModalEspecie nome={nomeEspecieNaURL} onClose={fecharModal} />
      )}
    </div>
  );
}
