import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const normalizarNome = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function DetalhesEspecie() {
  const router = useRouter();
  const { nome } = router.query;
  const [especie, setEspecie] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/Data/data.json");
      const data = await res.json();
      const todas = [...(data.flora || []), ...(data.fauna || [])];
      const item = todas.find((e) => normalizarNome(e.nome_comum) === nome);
      setEspecie(item);
    };
    if (nome) fetchData();
  }, [nome]);

  if (!especie) return <p className="p-8">Carregando...</p>;

  const textoTemMaisDe20Linhas = especie.texto.trim().split("\n").length > 20;

  return (
    <div className="min-h-screen w-full bg-[#B1DABB] flex flex-col items-center justify-center px-4 md:px-20 py-16">
      <div
        className={`max-w-6xl w-full flex ${
          textoTemMaisDe20Linhas ? "flex-col" : "flex-col md:flex-row"
        } items-start md:items-center justify-center gap-12`}
      >
        <div className="flex flex-col items-center space-y-4 md:w-1/2">
          <div className="w-full max-w-[700px] aspect-[16/10] overflow-hidden rounded-[36px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
            <img
              src={especie.imagem.replace("..", "")}
              alt={especie.nome_comum}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-4xl md:text-5xl font-semibold text-black drop-shadow text-center">
            {especie.nome_comum}
          </div>
          <div className="text-3xl font-semibold text-black drop-shadow text-center">
            ({especie.nome_cientifico})
          </div>
        </div>

        {/* Linha divisória */}
        {textoTemMaisDe20Linhas ? (
          <div className="h-[1px] bg-green-900 w-full my-4" />
        ) : (
          <>
            <div className="hidden md:block w-[1px] bg-green-900 self-stretch"></div>
            <div className="block md:hidden h-[1px] bg-green-900 w-full my-4"></div>
          </>
        )}

        {/* Texto da espécie */}
        <div className="md:w-1/2 text-lg text-black text-justify leading-relaxed space-y-4 whitespace-pre-line px-4 md:px-0 max-w-[700px] mx-auto">
          {especie.texto
            .trim()
            .split("\n\n")
            .map((paragrafo, idx) => (
              <p key={idx}>{paragrafo}</p>
            ))}
        </div>
      </div>

      {currentUrl && (
        <div className="mt-12 flex flex-col items-center">
          <QRCodeCanvas value={currentUrl} size={128} />
        </div>
      )}
    </div>
  );
}
