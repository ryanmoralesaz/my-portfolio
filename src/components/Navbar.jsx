// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
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

  // Click‐handler for "Home":
  const handleHomeClick = e => {
    e.preventDefault();
    if (isHomeRoute) {
      // If we're already on home and clicking home, just scroll to top
      scrollToTop();
    } else {
      // Navigate to home without triggering loading screen
      navigate("/", { replace: false });
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
      // We're already on home, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home with hash
      navigate(`/#${sectionId}`, { replace: false });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(var(--vanilla)/1)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center h-16 relative">
          <a href="/" onClick={handleHomeClick} className={`nav-link`}>
            <div className="text-2xl font-michroma text-flame pl-20">
              RyanMorales.info
            </div>
          </a>
          {/* Hamburger icon for mobile */}
          <div
            className={`md:hidden absolute left-0 w-7 h-5 flex items-center justify-center cursor-pointer z-50 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => setMenuOpen(prev => !prev)}>
            &#9776;
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {/* ─── HOME DROPDOWN ─── */}
            <li className="relative group">
              <a
                href="/"
                onClick={handleHomeClick}
                className={`nav-link ${isHomeRoute ? "font-bold" : ""}`}>
                Home <span className="text-xs">&#x25bc;</span>
              </a>

              {/* Submenu (dark text, no gap) */}
              <ul className="absolute top-full left-0 mt-0 w-48 bg-[rgb(var(--flame)/1)] text-bluemunsell rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <li className="border-b last:border-none">
                  <a
                    href="/#whoami"
                    onClick={(e) => handleHomeSectionClick(e, "whoami")}
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    About Me
                  </a>
                </li>
                <li className="border-b last:border-none">
                  <a
                    href="/#myclassroom"
                    onClick={(e) => handleHomeSectionClick(e, "myclassroom")}
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    My Classroom
                  </a>
                </li>
                <li>
                  <a
                    href="/#teachingphilosophy"
                    onClick={(e) => handleHomeSectionClick(e, "teachingphilosophy")}
                    className="block px-4 py-2 hover:bg-gray-100 hover-flame text-electricblue">
                    Teaching Philosophy
                  </a>
                </li>
              </ul>
            </li>

            {/* ─── PORTFOLIO DROPDOWN ─── */}
            <li className="relative group">
              <a
                href="/portfolio"
                onClick={handlePortfolioClick}
                className={`nav-link ${isPortfolioRoute ? "font-bold" : ""}`}>
                Portfolio <span className="text-xs">&#x25bc;</span>
              </a>

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
              <a
                href="/classroom"
                onClick={handleClassroomClick}
                className={`nav-link ${isClassroomRoute ? "font-bold" : ""}`}>
                Classroom Technology <span className="text-xs">&#x25bc;</span>
              </a>

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