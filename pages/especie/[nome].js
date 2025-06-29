import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ChevronDown } from "lucide-react"; // ícone da seta (instale lucide-react se quiser algo leve)

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
  const [showArrow, setShowArrow] = useState(false);
  const textoRef = useRef(null);

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

  useEffect(() => {
    const el = textoRef.current;
    if (!el) return;

    const updateArrow = () => {
      setShowArrow(el.scrollTop + el.clientHeight < el.scrollHeight - 10);
    };

    updateArrow();
    el.addEventListener("scroll", updateArrow);
    return () => el.removeEventListener("scroll", updateArrow);
  }, [especie]);

  if (!especie) return <p className="p-8">Carregando...</p>;

  return (
    <div className="min-h-screen w-full bg-[#B1DABB] flex flex-col items-center justify-center px-4 md:px-20 py-16">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-start justify-center gap-12 relative">
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

        <div className="hidden md:block w-[1px] bg-green-900 self-stretch"></div>
        <div className="block md:hidden h-[1px] bg-green-900 w-full my-4"></div>


        <div className="relative md:w-1/2 max-w-[700px] w-full">
          <div
            ref={textoRef}
            className="bg-white rounded-2xl shadow-lg px-6 py-4 text-lg text-black text-justify leading-relaxed
                       whitespace-pre-wrap break-words max-h-[18rem] overflow-y-auto pr-4"
          >
            {especie.texto
              .trim()
              .split("\n\n")
              .map((paragrafo, idx) => (
                <p key={idx} className="mb-4">
                  {paragrafo}
                </p>
              ))}
          </div>

          {showArrow && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="bg-[#B1DABB] rounded-full shadow-md p-2 animate-bounce">
                <ChevronDown className="w-10 h-10 text-green-900" />
              </div>
            </div>
          )}
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
