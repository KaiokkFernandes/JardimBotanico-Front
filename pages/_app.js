import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";
import BotaoScanner from "../components/BotaoScanner/BotaoScanner";
import Layout from "../components/Layout/index";
import { useRouter } from "next/router";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import styled from "styled-components";
import { ToastProvider } from "./../components/Utils/ToastContext";

const UserIconLink = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

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
    case "/admin/graficos":
      navbarType = "text";
      navbarConfig = {
        text: "📈 Dashboard de Visitas",
        rightContent: (
          <button
            onClick={() => router.push("/admin")}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              backgroundColor: "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          >
            ⬅ Voltar
          </button>
        ),
      };
      break;
    case "/admin/flora":
      navbarType = "text";
      navbarConfig = {
        text: "🌿 Painel da Flora",
        rightContent: (
          <button
            onClick={() => router.push("/admin")}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              backgroundColor: "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          >
            ⬅ Voltar
          </button>
        ),
      };
      break;
    case "/admin/fauna":
      navbarType = "text";
      navbarConfig = {
        text: "🐊 Painel da Fauna",
        rightContent: (
          <button
            onClick={() => router.push("/admin")}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              backgroundColor: "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          >
            ⬅ Voltar
          </button>
        ),
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
          <Link href="/auth">
            <UserIconLink>
              <CiUser />
            </UserIconLink>
          </Link>
        ),
      };
  }

  return (
    <ToastProvider>
      <Navbar type={navbarType} config={navbarConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {!router.pathname.startsWith("/admin") &&
        !router.pathname.startsWith("/auth") &&
        router.pathname !== "/scanner" && <BotaoScanner />}
    </ToastProvider>
  );
}

export default MyApp;
