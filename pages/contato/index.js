import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function Contato() {
  return (
    <section className="bg-gradient-to-br from-[#AEF6C7] to-[#5B8266] py-16 px-4 md:px-20">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-12">
        <h2 className="text-4xl font-extrabold text-[#212922] text-center mb-12">
          Entre em Contato
        </h2>

        <div className="space-y-10">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-[#3E6259] text-white rounded-xl">
              <FaPhoneAlt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#212922] mb-1">Telefone</h3>
              <a href="tel:+555532208973" className="block text-lg text-[#294936] hover:text-[#3E6259] transition">
                (55) 3220-8973
              </a>
              <a href="tel:+5555991938183" className="block text-lg text-[#294936] hover:text-[#3E6259] transition">
                (55) 99193-8183
              </a>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-[#3E6259] text-white rounded-xl">
              <FaEnvelope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#212922] mb-1">E-mail</h3>
              <a
                href="mailto:jardimbotanico@ufsm.br"
                className="text-lg underline text-[#294936] hover:text-[#3E6259] transition"
              >
                jardimbotanico@ufsm.br
              </a>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-[#3E6259] text-white rounded-xl">
              <FaMapMarkerAlt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#212922] mb-1">Endereço</h3>
              <address className="not-italic text-lg text-[#294936]">
                Av. Roraima, 1000 – Camobi<br />
                Santa Maria – RS, 97105-900
              </address>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-[#3E6259] text-white rounded-xl">
              <FaClock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#212922] mb-1">Funcionamento</h3>
              <p className="text-lg text-[#294936]">
                Seg–Sex · 8:30–12:00 & 13:30–17:00
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center space-x-8">
          <Link
            href="https://www.instagram.com/jardimbotanicodaufsm"
            target="_blank"
            rel="noreferrer"
            className="text-[#3E6259] hover:text-[#294936] text-2xl transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.facebook.com/JardimBotanicoDeSantaMaria"
            target="_blank"
            rel="noreferrer"
            className="text-[#3E6259] hover:text-[#294936] text-2xl transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </Link>
        </div>
      </div>
    </section>
);
}
