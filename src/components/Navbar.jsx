import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(var(--vanilla)/1)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-center items-center h-16 relative">
          <div
            className={`absolute left-0 w-7 h-5 relative cursor-pointer z-40 md:hidden ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#home" className="nav-link">
              About Me
            </a>
            <a href="#about" className="nav-link">
              Portfolio
            </a>
            <a href="#projects" className="nav-link">
              Classroom Technology
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
