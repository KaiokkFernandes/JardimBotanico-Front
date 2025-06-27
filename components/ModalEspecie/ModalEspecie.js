import { useEffect, useState } from "react";
import { normalizarNome } from "../Utils/normalizarNome";


export default function ModalEspecie({ nome, onClose }) {
  const [especie, setEspecie] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch("/Data/data.json");
        const json = await res.json();
        const todas = [...(json.flora || []), ...(json.fauna || [])];
        const encontrada = todas.find(
          (e) => normalizarNome(e.nome_comum) === nome
        );
        setEspecie(encontrada);
      } catch (error) {
        console.error("Erro ao carregar os dados da espécie:", error);
      }
    };
    carregar();
  }, [nome]);

  if (!especie) return null;

  const textoTemMaisDe20Linhas = especie.texto.trim().split("\n").length > 20;

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4 overflow-y-auto"
    >
      <div className="bg-[#B1DABB] rounded-3xl p-6 max-w-6xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-3xl font-bold"
          aria-label="Fechar modal"
        >
          ×
        </button>

        <div
          className={`flex ${
            textoTemMaisDe20Linhas ? "flex-col" : "flex-col md:flex-row"
          } items-start md:items-center justify-center gap-8`}
        >
          <div className="flex flex-col items-center space-y-4 md:w-1/2">
            <img
              src={especie.imagem}
              alt={especie.nome_comum}
              className="w-full max-w-[700px] h-auto rounded-[36px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
            />
            <div className="text-4xl md:text-5xl font-semibold text-black text-center">
              {especie.nome_comum}
            </div>
            <div className="text-2xl font-semibold text-black text-center">
              ({especie.nome_cientifico})
            </div>
          </div>

          {textoTemMaisDe20Linhas ? (
            <div className="h-[1px] bg-green-900 w-full my-4" />
          ) : (
            <>
              <div className="hidden md:block w-[1px] bg-green-900 self-stretch"></div>
              <div className="block md:hidden h-[1px] bg-green-900 w-full my-4"></div>
            </>
          )}

          <div className="md:w-1/2 text-lg text-black text-justify leading-relaxed whitespace-pre-line px-2 max-w-[700px] mx-auto">
            {especie.texto
              .trim()
              .split("\n\n")
              .map((paragrafo, idx) => (
                <p key={idx} className="mb-4">
                  {paragrafo}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
