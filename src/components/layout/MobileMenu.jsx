// Update your MobileMenu component

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
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

        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-flame my-4 transform transition-transform duration-300 hover:text-bluemunsell ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Home
        </a>

        <a
          href="/portfolio"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-flame my-4 transform transition-transform duration-300 hover:text-bluemunsell ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Portfolio
        </a>

        <a
          href="/classroom"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-flame my-4 transform transition-transform duration-300 hover:text-bluemunsell ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Classroom Technology
        </a>
      </div>
    </>
  );
};