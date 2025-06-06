import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (target) => {
    setMenuOpen(false);
    if (target === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      navigate(`/${target}`, { replace: true });
    }
  };

  return (
    <>
      {/* Background underlay */}
      <div
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-300 ${
          menuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Menu content */}
      <div className={`fixed top-0 left-0 w-full bg-[rgb(var(--vanilla))] z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"
      }`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-flame text-3xl focus:outline-none cursor-pointer font-bold"
          aria-label="Close Menu"
        >
          &times;
        </button>

        <button
          onClick={() => handleClick("home")}
          className={`text-2xl font-semibold text-flame my-4 transform transition-transform duration-300 hover:text-bluemunsell ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => handleClick("portfolio")}
          className={`text-2xl font-semibold text-flame my-4 transform transition-transform duration-300 hover:text-bluemunsell ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Portfolio
        </button>

        <button
          onClick={() => handleClick("classroom")}
          className={`text-2xl font-semibold text-flame my-4 transform transition-transform duration-300 hover:text-bluemunsell ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Classroom Technology
        </button>
      </div>
    </>
  );
};
