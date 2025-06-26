import { useState, useEffect } from "react";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";

const Navbar = ({ type = "default", config = {} }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (type === "none") return;

    let lastScrollY = window.scrollY;
    const controlNavbar = () => {
      setIsVisible(window.scrollY < lastScrollY || window.scrollY < 100);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [type]);

  if (type === "none") return null;

  return (
    <nav
      className={`fixed w-full bg-[#0F2415] shadow-md transition-transform duration-300 z-50 
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Conteúdo baseado no tipo */}
          {type === "text" && (
            <div className="text-white font-semibold text-lg">
              {config.text}
            </div>
          )}

          {type !== "text" && config.links && (
            <div className="hidden md:flex items-center space-x-8">
              {config.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white hover:text-gray-400 px-3 py-2 rounded-md text-md font-semibold transition`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex items-center">
            {config.rightContent ?? null}
          </div>

          {type !== "text" && config.links && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white"
              >
                {isMobileMenuOpen ? (
                  <BiX className="text-3xl" />
                ) : (
                  <BiMenu className="text-3xl" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {type !== "text" && config.links && (
        <div
          className={`md:hidden transition-all duration-300 ease-in-out px-4 
          ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-2 pb-3 space-y-1 sm:px-3">
            {config.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-600 hover:bg-gray-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
