// src/pages/MainPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import { LoadingScreen } from "../components/LoadingScreen";
import { Navbar } from "../components/Navbar";
import { MobileMenu } from "../components/MobileMenu";
import { Home } from "../components/sections/Home";
import { LeftTextSection } from "../components/sections/LeftTextSection";
import { RightTextSection } from "../components/sections/RightTextSection";
import { ImageCarousel } from "../components/sections/ImageCarousel";
import { Footer } from "../components/Footer";

import { mainContent, imageGalleries } from "../data/mainContent";

export default function MainPage({
  hasLoadedOnce,
  setHasLoadedOnce,
  isRefresh,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef(null);
  const location = useLocation();

  // Determine if we should show the loader
  const shouldShowLoader = !hasLoadedOnce || isRefresh;

  useEffect(() => {
    if (!shouldShowLoader) {
      setIsLoaded(true);
    }
  }, [shouldShowLoader]);

  // Scroll-to-hash logic (runs only after loader is done)
  useEffect(() => {
    if (!isLoaded) return;

    if (location.hash) {
      const id = location.hash.replace("#", "");
      const container = containerRef.current;
      if (!container) return;

      container.style.opacity = "0.3";
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
        container.style.opacity = "1";
      }, 400);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location, isLoaded]);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
    setHasLoadedOnce(true); // Mark that we've shown the loader once
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
  };

  if (!isLoaded) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div ref={containerRef} className="pt-16 fade-transition">
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* ---- HERO SECTION (Home) ---- */}
        <section>
          <Home />
        </section>

        {/* ---- About Me ("Who Am I?") ---- */}
        <section>
          <LeftTextSection title={mainContent.whoAmI.title}>
            {mainContent.whoAmI.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </LeftTextSection>
        </section>

        {/* ---- about me carousel ---- */}
        <section>
          <ImageCarousel images={mainContent.aboutMeCarousel} />
        </section>

        {/* ---- My Classroom section ---- */}
        <section>
          <RightTextSection title={mainContent.myClassroom.title}>
            {mainContent.myClassroom.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </RightTextSection>
        </section>

        {/* ---- my classroom carousel ---- */}
        <section>
          <ImageCarousel images={imageGalleries[1]} />
        </section>

        {/* ---- Teaching Philosophy ---- */}
        <section>
          <LeftTextSection title={mainContent.teachingPhilosophy.title}>
            {mainContent.teachingPhilosophy.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </LeftTextSection>
        </section>

        {/* ---- Third Carousel ---- */}
        <section>
          <ImageCarousel
            images={mainContent.aboutMeCarousel}
          />
        </section>

        <Footer />
      </div>
    </>
  );
}
