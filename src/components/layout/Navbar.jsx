// src/components/layout/Navbar.jsx
import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen, containerRef }) => {
  // Add containerRef prop
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Determine which top‐level route we're on:
  const isHomeRoute = location.pathname === "/";
  const isPortfolioRoute = location.pathname.startsWith("/portfolio");
  const isClassroomRoute = location.pathname.startsWith("/classroom");

  // Scroll‐to‐top utility:
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Click‐handler for "Home" and Logo:
  const handleHomeClick = e => {
    e.preventDefault();
    if (isHomeRoute) {
      // If we're already on home, just scroll to top without reload
      scrollToTop();
    } else {
      // Navigate to home without triggering loading screen
      navigate("/", { replace: true });
    }
  };

  // Click‐handler for "Portfolio":
  const handlePortfolioClick = e => {
    e.preventDefault();
    if (isPortfolioRoute) {
      scrollToTop();
    } else {
      navigate("/portfolio", { replace: false });
    }
  };

  // Click‐handler for "Classroom Technology":
  const handleClassroomClick = e => {
    e.preventDefault();
    if (isClassroomRoute) {
      scrollToTop();
    } else {
      navigate("/classroom", { replace: false });
    }
  };

  // Handle home section links - these should NOT trigger navigation
  const handleHomeSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (isHomeRoute) {
      // We're already on home, add the fade effect like other pages
      const container =
        containerRef?.current || document.querySelector(".fade-transition");
      if (container) {
        container.style.opacity = "0.3"; // Fade out
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
          container.style.opacity = "1"; // Fade back in
        }, 400);
      } else {
        // Fallback if container not found
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // Navigate to home with hash
      navigate(`/#${sectionId}`, { replace: false });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(var(--vanilla)/1)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        {" "}
        {/* Add relative here */}
        <div className="flex justify-between items-center h-16">
          {/* Fix logo */}
          <div onClick={handleHomeClick} className="nav-link cursor-pointer">
            <div className="text-xl md:text-2xl font-michroma text-flame">
              RyanMorales.info
            </div>
          </div>

          {/* Hamburger icon - now relative to container, not viewport */}
          <div
            className={`md:hidden flex items-center justify-center cursor-pointer z-50 text-flame text-xl font-bold ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => setMenuOpen(prev => !prev)}>
            &#9776;
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {/* ─── HOME DROPDOWN ─── */}
            <li className="relative group">
              <button
                onClick={handleHomeClick}
                className={`nav-link ${
                  isHomeRoute ? "font-bold" : ""
                } bg-transparent border-none`}>
                Home <span className="text-xs">&#x25bc;</span>
              </button>

              {/* Submenu */}
              <ul className="absolute top-full left-0 mt-0 w-48 bg-[rgb(var(--flame)/1)] text-bluemunsell rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
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
                <li>
                  <button
                    onClick={e =>
                      handleHomeSectionClick(e, "teachingphilosophy")
                    }
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue bg-transparent border-none">
                    Teaching Philosophy
                  </button>
                </li>
              </ul>
            </li>

            {/* ─── PORTFOLIO DROPDOWN ─── */}
            <li className="relative group">
              <button
                onClick={handlePortfolioClick}
                className={`nav-link ${
                  isPortfolioRoute ? "font-bold" : ""
                } bg-transparent border-none`}>
                Portfolio <span className="text-xs">&#x25bc;</span>
              </button>

              <ul className="absolute top-full left-0 mt-0 w-48 bg-[rgb(var(--flame)/1)] text-bluemunsell rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
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
            </li>

            {/* ─── CLASSROOM TECHNOLOGY DROPDOWN ─── */}
            <li className="relative group">
              <button
                onClick={handleClassroomClick}
                className={`nav-link ${
                  isClassroomRoute ? "font-bold" : ""
                } bg-transparent border-none`}>
                Classroom Technology <span className="text-xs">&#x25bc;</span>
              </button>

              <ul className="absolute top-full left-0 mt-0 w-48 bg-[rgb(var(--flame)/1)] text-bluemunsell rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#how-i-use-technology"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    How I Use Technology
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#digital-citizenship"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    Digital Citizenship
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/classroom#student-tech-engagement"
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    Student Technology Engagement
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
