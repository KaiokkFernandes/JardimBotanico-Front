import Head from "next/head";
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback
} from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { ChevronDown, Copy } from "lucide-react";
import { normalizarNome } from "../../components/Utils/normalizarNome";

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
    if (!nome) return;
    fetch("/Data/data.json")
      .then(res => res.json())
      .then(data => {
        const all = [...(data.flora || []), ...(data.fauna || [])];
        setEspecie(all.find(e => normalizarNome(e.nome_comum) === nome) || null);
      })
      .catch(console.error);
  }, [nome]);

  useEffect(() => {
    const el = textoRef.current;
    if (!el) return;
    const onScroll = () => {
      setShowArrow(el.scrollTop + el.clientHeight < el.scrollHeight - 10);
    };
    el.addEventListener("scroll", onScroll);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [especie]);

  const paragraphs = useMemo(() => {
    if (!especie) return [];
    return especie.texto.trim().split("\n\n").filter(p => p);
  }, [especie]);

  const scrollDownTwoLines = useCallback(() => {
    const el = textoRef.current;
    if (!el) return;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    el.scrollBy({ top: lineHeight * 2, behavior: "smooth" });
  }, []);

  if (!especie) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#212922] font-medium">Carregando…</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{especie.nome_comum} — Jardim Botânico UFSM</title>
        <meta
          name="description"
          content={paragraphs[0]?.slice(0, 150) || "Detalhes da espécie"}
        />
      </Head>

      <article className="min-h-screen bg-[#B1DABB] flex flex-col items-center py-16 px-4 md:px-20">
        <header className="w-full max-w-6xl flex flex-col md:flex-row gap-12">
          <figure className="md:w-1/2 w-full flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={especie.imagem.replace("..", "")}
                alt={especie.nome_comum}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <figcaption className="mt-6 text-center">
              <h1 className="text-4xl md:text-5xl font-semibold text-[#212922]">
                {especie.nome_comum}
              </h1>
              <p className="text-2xl italic text-gray-700 mt-1">
                ({especie.nome_cientifico})
              </p>
            </figcaption>
          </figure>

          <div className="hidden md:block w-px bg-[#212922]" aria-hidden />

          <section className="md:w-1/2 w-full">
            <div className="relative">
              <div
                ref={textoRef}
                className="bg-white rounded-3xl p-6 text-lg leading-relaxed max-h-72 overflow-y-auto pr-4 text-justify"
              >
                {paragraphs.map((p, i) => (
                  <p key={i} className="mb-4">{p}</p>
                ))}
              </div>
              {showArrow && (
                <button
                  onClick={scrollDownTwoLines}
                  className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
                  aria-label="Descer texto"
                >
                  <ChevronDown size={24} className="text-[#212922]" />
                </button>
              )}
            </div>
          </section>
        </header>

        <footer className="mt-12 flex flex-col items-center space-y-4">
          <QRCodeCanvas value={currentUrl} size={128} fgColor="#212922" />
          <button
            onClick={() => navigator.clipboard.writeText(currentUrl)}
            className="flex items-center space-x-2 text-[#3E6259] hover:text-[#294936] focus:outline-none"
          >
            <Copy size={20} />
            <span className="font-medium">Copiar link</span>
          </button>
        </footer>
      </article>
    </>
  );
}
