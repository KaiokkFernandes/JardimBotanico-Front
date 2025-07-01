import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiMenu, BiX } from "react-icons/bi";

export default function Navbar({ config = {} }) {
  const { links = [], rightContent = null, brand = "Início" } = config;
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let prevY = window.scrollY;
    const onScroll = () => {
      const currY = window.scrollY;
      setVisible(currY < prevY || currY < 50);
      prevY = currY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 bg-[#212922] z-50 transform transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#AEF6C7] text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#AEF6C7]"
          >
            {brand}
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-white text-lg font-medium pb-1 transition-colors duration-200 ${
                  router.pathname === href
                    ? "border-b-2 border-[#AEF6C7] text-[#AEF6C7]"
                    : "hover:text-[#AEF6C7]"
                }`}
                aria-current={router.pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            {rightContent && <div className="ml-6">{rightContent}</div>}
          </nav>
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#AEF6C7]"
          >
            <BiMenu size={28} />
          </button>
        </div>
      </header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#212922] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <span className="text-[#AEF6C7] text-xl font-bold">{brand}</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#AEF6C7]"
          >
            <BiX size={28} />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-4 space-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block text-white text-lg font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                router.pathname === href ? "bg-[#5B8266]" : "hover:bg-[#3E6259]"
              }`}
              onClick={() => setOpen(false)}
              aria-current={router.pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          {rightContent && <div className="mt-6 px-3">{rightContent}</div>}
        </nav>
      </aside>
    </>
  );
}
