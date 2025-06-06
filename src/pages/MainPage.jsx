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

import { textSections, imageGalleries } from "../data/content";

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
        <section id="home">
          <Home />
        </section>

        {/* ---- About Me ("Who Am I?") ---- */}
        <section id="whoami">
          <LeftTextSection title={textSections.whoAmI.title}>
            {textSections.whoAmI.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </LeftTextSection>
        </section>

        {/* ---- First Carousel ---- */}
        <section id="carousel1">
          <ImageCarousel images={imageGalleries[0]} />
        </section>

        {/* ---- My Classroom section ---- */}
        <section id="myclassroom">
          <RightTextSection title={textSections.myClassroom.title}>
            {textSections.myClassroom.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </RightTextSection>
        </section>

        {/* ---- Second Carousel ---- */}
        <section id="carousel2">
          <ImageCarousel images={imageGalleries[1]} />
        </section>

        {/* ---- Teaching Philosophy ---- */}
        <section id="teachingphilosophy">
          <LeftTextSection title={textSections.teachingPhilosophy.title}>
            {textSections.teachingPhilosophy.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </LeftTextSection>
        </section>

        {/* ---- Third Carousel ---- */}
        <section id="carousel3">
          <ImageCarousel
            images={[
              "/computer-keyboard.jpg",
              "/computer-keyboard.jpg",
              "/computer-keyboard.jpg",
            ]}
          />
        </section>

        <Footer />
      </div>
    </>
  );
}
