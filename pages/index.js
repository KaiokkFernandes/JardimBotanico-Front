import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import UtilidadesSection from '../components/Forms'; 
export default function Home() {
  return (
    <>
      <Head>
        <title>Jardim Botânico da UFSM</title>
        <meta
          name="description"
          content="Explore o Jardim Botânico da UFSM: biodiversidade, pesquisas e utilidades."
        />
      </Head>

      <HeroSection />
      <AboutSection id="about" />
      <UtilidadesSection id="utilidades" />
    </>
  );
}
