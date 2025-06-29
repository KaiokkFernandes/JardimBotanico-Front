import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ModalEspecie from "../components/ModalEspecie/ModalEspecie";
import { normalizarNome } from "../components/Utils/normalizarNome";

export default function Feed() {
  const router = useRouter();
  const [todasEspecies, setTodasEspecies] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Data/data.json")
      .then((res) => res.json())
      .then((json) =>
        setTodasEspecies([...(json.flora || []), ...(json.fauna || [])])
      )
      .catch((err) => console.error("Erro ao carregar data.json:", err))
      .finally(() => setLoading(false));
  }, []);

  const abrirModal = useCallback(
    (nome) => {
      router.push(`/feed?especie=${nome}`, undefined, { shallow: true });
    },
    [router]
  );
  const fecharModal = useCallback(() => {
    router.push("/feed", undefined, { shallow: true });
  }, [router]);

  const nomeEspecieNaURL = router.query.especie || null;

  const especiesFiltradas = todasEspecies.filter((especie) =>
    normalizarNome(especie.nome_comum).includes(normalizarNome(busca))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-green-900 font-semibold">Carregando espécies…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#AEF6C7] to-[#5B8266] p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#212922] text-center mb-6">
        Conheça as Espécies
        <span className="block w-16 h-1 bg-[#294936] rounded-full mt-2 mx-auto" />
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome comum..."
            className="
              w-full pl-4 pr-12 py-3 rounded-full border-2 border-[#3E6259]
              focus:outline-none focus:ring-2 focus:ring-[#3E6259]
              text-[#212922] placeholder-[#3E6259] font-medium
            "
          />
          <svg
            className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3E6259]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M6.5 11a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
          </svg>
        </div>
      </div>

      {especiesFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {especiesFiltradas.map((especie) => {
            const key = normalizarNome(especie.nome_comum);
            return (
              <div
                key={key}
                onClick={() => abrirModal(key)}
                className="
                  bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
                  transform hover:-translate-y-1 hover:scale-[1.02]
                  transition duration-300 ease-out
                "
              >
                <div className="relative w-full h-48">
                  <Image
                    src={especie.imagem}
                    alt={especie.nome_comum}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-[#212922] mb-1 border-b-2 border-[#5B8266] inline-block">
                    {especie.nome_comum}
                  </h2>
                  <p className="text-sm italic text-gray-600 mt-1">
                    {especie.nome_cientifico}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-[#212922] font-medium mt-12">
          Nenhuma espécie encontrada para “{busca}”.
        </p>
      )}

      {nomeEspecieNaURL && (
        <ModalEspecie nome={nomeEspecieNaURL} onClose={fecharModal} />
      )}
    </div>
  );
}
