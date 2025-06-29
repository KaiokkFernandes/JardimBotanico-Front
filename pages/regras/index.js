export default function RegrasPage() {
  return (
    <section className="min-h-screen w-full bg-[#B1DABB] px-4 py-24 md:px-16 lg:px-32 flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold text-green-950 text-center mb-12">
        Regras do Jardim Botânico
      </h1>

      <div className="grid gap-6 max-w-5xl w-full">
        {[
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
        ].map((regra, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-5 text-green-950 text-lg font-medium leading-relaxed hover:scale-[1.01] transition-transform"
          >
            <span className="font-bold mr-2 text-green-800">•</span>
            {regra}
          </div>
        ))}
      </div>
    </section>
  );
}
