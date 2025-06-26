import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  let navbarType = "default";
  let navbarConfig = {};

  switch (router.pathname) {
    case "/login":
      navbarType = "text";
      navbarConfig = { text: "Bem-vindo! Faça login para continuar." };
      break;

    case "/admin":
      navbarType = "text";
      navbarConfig = {
        text: "Painel administrativo - Jardim Botânico UFSM",
        rightContent: <span className="text-white">Admin 🔐</span>,
      };
      break;

    case "/fullscreen":
      navbarType = "none";
      break;

    default:
      navbarType = "default";
      navbarConfig = {
        links: [
          { href: "/", label: "Página inicial" },
          { href: "/regras", label: "Regras do Jardim" },
          { href: "/comochegar", label: "Como Chegar" },
          { href: "/contato", label: "Contato" },
        ],
      };
  }

  return (
    <>
      <Navbar type={navbarType} config={navbarConfig} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
