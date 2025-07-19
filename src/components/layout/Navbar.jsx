// src/components/layout/Navbar.jsx
import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen, containerRef }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isHomeRoute = location.pathname === "/";
  // const isPortfolioRoute = location.pathname.startsWith("/portfolio");
  const isClassroomRoute = location.pathname.startsWith("/classroom");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeClick = e => {
    e.preventDefault();
    if (isHomeRoute) {
      scrollToTop();
    } else {
      navigate("/", { replace: true });
    }
  };

  // const handlePortfolioClick = e => {
  //   e.preventDefault();
  //   if (isPortfolioRoute) {
  //     scrollToTop();
  //   } else {
  //     navigate("/portfolio", { replace: false });
  //   }
  // };

  const handleClassroomClick = e => {
    e.preventDefault();
    if (isClassroomRoute) {
      scrollToTop();
    } else {
      navigate("/classroom", { replace: false });
    }
  };

  const handleHomeSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (isHomeRoute) {
      const container =
        containerRef?.current || document.querySelector(".fade-transition");
      if (container) {
        container.style.opacity = "0.3";
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
          container.style.opacity = "1";
        }, 400);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(`/#${sectionId}`, { replace: false });
    }
  };

  // Common dropdown styles
  const dropdownStyles = {
    zIndex: 10000,
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: 0
  };

  return (
    <nav
      className="fixed top-0 w-full bg-[rgba(var(--vanilla)/1)] backdrop-blur-lg border-b border-white/10 shadow-lg"
      style={{ zIndex: 9999, overflow: 'visible' }}>
      <div className="max-w-[1200px] mx-auto px-4 relative" style={{ overflow: 'visible' }}>
        <div className="flex justify-between items-center h-16" style={{ overflow: 'visible' }}>
          {/* Logo */}
          <div onClick={handleHomeClick} className="nav-link cursor-pointer">
            <div className="text-xl md:text-2xl font-michroma text-flame">
              RyanMorales.info
            </div>
          </div>

          {/* Hamburger icon */}
          <div
            className={`md:hidden flex items-center justify-center cursor-pointer text-flame text-xl font-bold ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            style={{ zIndex: 10001 }}
            onClick={() => setMenuOpen(prev => !prev)}>
            &#9776;
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6" style={{ overflow: 'visible' }}>
            {/* ─── HOME DROPDOWN ─── */}
            <li className="relative group" style={{ overflow: 'visible' }}>
              <button
                onClick={handleHomeClick}
                className={`nav-link ${
                  isHomeRoute ? "font-bold" : ""
                } bg-transparent border-none`}>
                Home <span className="text-xs">&#x25bc;</span>
              </button>

              {/* Submenu */}
              <ul
                className="w-48 bg-[rgb(var(--flame)/1)] text-bluemunsell rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                style={dropdownStyles}>
                <li className="border-b last:border-none">
                  <button
                    onClick={handleHomeClick}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue bg-transparent border-none">
                    Home
                  </button>
                </li>
                <li className="border-b last:border-none">
                  <button
                    onClick={e => handleHomeSectionClick(e, "whoami")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue bg-transparent border-none">
                    About Me
                  </button>
                </li>
                <li className="border-b last:border-none">
                  <button
                    onClick={e => handleHomeSectionClick(e, "myclassroom")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue bg-transparent border-none">
                    My Classroom
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={e =>
                      handleHomeSectionClick(e, "teachingphilosophy")
                    }
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue bg-transparent border-none">
                    Teaching Philosophy
                  </button>
                </li> */}
              </ul>
            </li>

            {/* ─── PORTFOLIO DROPDOWN ─── */}
            {/* <li className="relative group" style={{ overflow: 'visible' }}>
              <button
                onClick={handlePortfolioClick}
                className={`nav-link ${
                  isPortfolioRoute ? "font-bold" : ""
                } bg-transparent border-none`}>
                Portfolio <span className="text-xs">&#x25bc;</span>
              </button>
              <ul
                className="w-48 bg-[rgb(var(--flame)/1)] text-bluemunsell rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                style={dropdownStyles}>
                <li className="border-b last:border-none">
                  <a
                    href="/portfolio#portfolio"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    My Portfolio
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/portfolio#community-engagement"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    Community Engagement
                  </a>
                </li>
                <li>
                  <a
                    href="/portfolio#lesson-plans"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    Lesson Plans
                  </a>
                </li>
              </ul>
            </li> */}

            {/* ─── CLASSROOM TECHNOLOGY DROPDOWN ─── */}
            <li className="relative group" style={{ overflow: 'visible' }}>
              <button
                onClick={handleClassroomClick}
                className={`nav-link ${
                  isClassroomRoute ? "font-bold" : ""
                } bg-transparent border-none`}>
                Classroom Technology <span className="text-xs">&#x25bc;</span>
              </button>

              {/* Submenu */}
              <ul
                className="w-48 bg-[rgb(var(--flame)/1)] text-bluemunsell rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                style={dropdownStyles}>
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#how-i-use-technology"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    How I Use Technology
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#teach-technology"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    How I Teach Technology
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#student-learn-tec"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    How My Students Learn with Tech
                  </a>
                </li>
                <li>
                  <a
                    href="/classroom#culturally-relevant-learning"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    Culturally Relevant Learning Strategies
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};