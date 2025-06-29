export default function RegrasPage() {
  return (
    <div>
      <section className="min-h-screen w-full bg-[#B1DABB] flex items-center justify-center px-4 md:px-20">
        <div className="flex flex-col md:flex-row items-start gap-8 max-w-6xl">
          <h1 className="text-4xl md:text-7xl pr-5 pt-5 font-semibold text-green-950 whitespace-nowrap">
            Regras do Jardim:
          </h1>
          <ul className="list-disc list-inside text-lg text-green-950 leading-relaxed max-w-xl text-justify">
            <li>Não jogar lixo no chão.</li>
            <li>Não fumar.</li>
            <li>Não tomar bebidas alcoólicas, ou quaisquer substâncias ilícitas.</li>
            <li>Para passear com os pets, usar sempre a guia e permanecer nos entornos da sede.</li>
            <li>Não entrar com o carro sem autorização.</li>
            <li>
              Não portar armas, nem instrumentos destinados ao corte de vegetação, captura, caça, pesca ou quaisquer
              outras atividades prejudiciais à fauna e flora.
            </li>
            <li>Jamais abandonar animais, nem plantar em áreas abertas sem autorização.</li>
            <li>Jamais colher plantas, nem as flores, nem os frutos.</li>
            <li>
              Jamais capturar animais silvestres, insetos, peixes, ou qualquer outro material biológico, ainda que caídos
              no chão.
            </li>
            <li>Jamais maltratar animais silvestres, nem depredar e/ou destruir patrimônio público.</li>
            <li>Não utilizar aparelhos sonoros, a menos que utilize fones de ouvido.</li>
            <li>Sempre assinar o livro de visitações quando visitar o JB-UFSM.</li>
            <li>Respeitar as datas e horários de funcionamento.</li>
            <li>Respeitar os colegas e as orientações que são dadas durante a visitação.</li>
            <li>Lembrar sempre que um dos objetivos mais importantes do JB-UFSM é a preservação das espécies.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
