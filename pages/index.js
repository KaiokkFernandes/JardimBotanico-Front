import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import UtilidadesSection from "../components/Forms";

function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <HeroSection />
        <AboutSection />
        <UtilidadesSection />
      </div>
    </div>
  );
}



export default Home;
