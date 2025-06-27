import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiMenu, BiX } from "react-icons/bi";

const Navbar = ({ type = "default", config = {} }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  if (type === "none") return null;

  return (
    <nav
      className={`fixed w-full bg-[#0F2415] shadow-md transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* LEFT */}
          <div className="flex items-center space-x-6">
            {type === "text" ? (
              <span className="text-white text-md font-medium">
                {config.text || ""}
              </span>
            ) : (
              <div className="hidden md:flex items-center space-x-6">
                {config.links?.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-white hover:text-gray-400 px-3 py-2 rounded-md text-md font-semibold transition ${
                      router.pathname === link.href ? "text-blue-200 underline" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center">
            {config.rightContent && (
              <div className="text-white">{config.rightContent}</div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          {type === "default" && (
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

      {/* MOBILE MENU */}
      {type === "default" && (
        <div
          className={`md:hidden transition-all duration-300 ease-in-out px-4 ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-2 pb-3 space-y-1 sm:px-3">
            {config.links?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  router.pathname === link.href
                    ? "text-blue-200 bg-blue-900"
                    : "text-white hover:text-gray-600 hover:bg-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {config.rightContent && (
              <div className="pt-2 border-t border-gray-600 text-white">
                {config.rightContent}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
