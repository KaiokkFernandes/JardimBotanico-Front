import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/router";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  let navbarType = "default";
  let navbarConfig = {};

  switch (router.pathname) {
    case "/auth":
    case "/login":
    case "/admin":
    case "/fullscreen":
      navbarType = "text";
      navbarConfig = {
        text:
          router.pathname === "/auth"
            ? "Bem-vindo! Faça login ou cadastre-se para continuar."
            : router.pathname === "/login"
            ? "Bem-vindo! Faça login para continuar."
            : "Painel administrativo - Jardim Botânico UFSM",
        rightContent:
          router.pathname === "/admin" ? (
            <span className="text-white">Admin 🔐</span>
          ) : null,
      };
      break;

    default:
      navbarType = "default";
      navbarConfig = {
        links: [
          { href: "/", label: "Página inicial" },
          { href: "/regras", label: "Regras do Jardim" },
          { href: "/comochegar", label: "Como Chegar" },
          { href: "/contato", label: "Contato" },
          { href: "/feed", label: "Conheça as Espécies" },

        ],
        rightContent: (
          <Link
            href="/auth"
            className="text-white font-medium hover:underline ml-4"
          >
            Login
          </Link>
        ),
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
