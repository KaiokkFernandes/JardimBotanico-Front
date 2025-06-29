const rules = [
  "Não jogar lixo no chão.",
  "Não fumar.",
  "Não tomar bebidas alcoólicas, ou quaisquer substâncias ilícitas.",
  "Para passear com os pets, usar sempre a guia e permanecer nos entornos da sede.",
  "Não entrar com o carro sem autorização.",
  "Não portar armas, nem instrumentos destinados ao corte de vegetação, captura, caça, pesca ou quaisquer outras atividades prejudiciais à fauna e flora.",
  "Jamais abandonar animais, nem plantar em áreas abertas sem autorização.",
  "Jamais colher plantas, nem as flores, nem os frutos.",
  "Jamais capturar animais silvestres, insetos, peixes, ou qualquer outro material biológico, ainda que caídos no chão.",
  "Jamais maltratar animais silvestres, nem depredar e/ou destruir patrimônio público.",
  "Não utilizar aparelhos sonoros, a menos que utilize fones de ouvido.",
  "Sempre assinar o livro de visitações quando visitar o JB-UFSM.",
  "Respeitar as datas e horários de funcionamento.",
  "Respeitar os colegas e as orientações que são dadas durante a visitação.",
  "Lembrar sempre que um dos objetivos mais importantes do JB-UFSM é a preservação das espécies.",
];

export default function RegrasPage() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#AEF6C7] to-[#5B8266]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#212922] text-center">
          Regras do Jardim Botânico
          <span className="block w-24 h-1 bg-[#294936] rounded mt-3 mx-auto" />
        </h1>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
          {rules.map((regra, idx) => (
            <div
              key={idx}
              className="relative bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-[#294936] rounded-l-xl" />
              <p className="pl-4 text-[#212922] font-medium leading-relaxed">
                {regra}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
