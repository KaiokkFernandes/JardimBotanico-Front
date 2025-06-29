import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contato() {
  return (
    <div className="min-h-screen w-full bg-[#B1DABB] flex items-center justify-center px-4 py-12 md:px-20">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 max-w-5xl w-full space-y-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6 text-green-900 text-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-green-950">Contato</h1>
          <div className="space-y-3">
            <p><strong>JARDIM BOTÂNICO DA UFSM</strong></p>
            <p>
              Av. Roraima nº 1000<br />
              Cidade Universitária, Bairro Camobi<br />
              Santa Maria - RS<br />
              CEP: 97105-900
            </p>

            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-800" /> (55) 3220-8973
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-800" /> (55) 99193-8183
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-green-800" />
              <a
                href="mailto:jardimbotanico@ufsm.br"
                className="underline hover:text-green-700 transition"
              >
                jardimbotanico@ufsm.br
              </a>
            </p>

            <p>
              <strong>Funcionamento:</strong><br />
              Segunda à Sexta: 8:30h - 12h, 13:30h - 17h
            </p>
          </div>

          <div className="flex gap-6 pt-2">
            <Link
              href="https://www.instagram.com/jardimbotanicodaufsm"
              target="_blank"
              className="text-green-900 hover:text-green-700 transition text-2xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.facebook.com/JardimBotanicoDeSantaMaria?_rdr"
              target="_blank"
              className="text-green-900 hover:text-green-700 transition text-2xl"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/Imagens/jardim_plantas.jpg"
            alt="Imagem do Jardim Botânico"
            width={500}
            height={500}
            className="rounded-xl drop-shadow-2xl object-cover max-h-[400px] w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
