import Link from "next/link";

export default function ComoChegar() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <section className="min-h-screen w-full bg-[#B1DABB] flex flex-col pt-10 px-4 md:px-20 gap-6">
        <p className="text-green-900 text-lg leading-relaxed max-w-3xl">
          <strong>Endereço:</strong> Av. Roraima, 1000 – Camobi, Santa Maria – RS, 97105-900, Brasil
          <br />
          <strong>Entrada Principal:</strong> seguir em rua atrás do prédio 21.
          <br />
          <strong>Entrada Secundária:</strong> na rotatória da BR-287 pegar entrada para Estrada Geral Pará Arroio do Sol até o destino.
        </p>

        <div className="w-full max-w-4xl h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.0262221939684!2d-53.73203352392047!3d-29.71899967508901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9503b5fb8ce36ee5%3A0xa57b162c6dfaa433!2sJardim%20Bot%C3%A2nico%20de%20Santa%20Maria!5e0!3m2!1spt-BR!2sbr!4v1747154291405!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
