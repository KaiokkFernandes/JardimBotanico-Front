import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import UtilidadesSection from "../components/Forms";
import MapSection from "../components/MapSection";
import Sidebar from "../components/sidebar";


function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "250px" }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>
        <HeroSection />
        <AboutSection />
        <UtilidadesSection />
        <MapSection />
      </div>
    </div>
  );
}

export default Home;
