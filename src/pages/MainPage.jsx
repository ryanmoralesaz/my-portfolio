// src/pages/MainPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { LoadingScreen } from "../components/layout/LoadingScreen";
import { Navbar } from "../components/layout/Navbar";
import { MobileMenu } from "../components/layout/MobileMenu";
import { Hero } from "../components/sections/Hero";
import { TextSection } from "../components/ui/TextSection"; // Only import the new one
import { ImageCarousel } from "../components/ui/ImageCarousel";
import { Footer } from "../components/layout/Footer";
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
    setHasLoadedOnce(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
  };

  if (!isLoaded) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        containerRef={containerRef} // Pass the containerRef
      />
      <div ref={containerRef} className="pt-16 fade-transition">
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* ---- HERO SECTION ---- */}
        <section id="home">
          <Hero />
        </section>

        {/* ---- About Me ("Who Am I?") ---- */}
        <section id="whoami">
          {" "}
          {/* Add this ID */}
          <TextSection title={mainContent.whoAmI.title} position="left">
            {mainContent.whoAmI.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </TextSection>
        </section>

        {/* ---- about me carousel ---- */}
        <section>
          <ImageCarousel images={mainContent.aboutMeCarousel} />
        </section>

        {/* ---- My Classroom section ---- */}
        <section id="myclassroom">
          {" "}
          {/* Add this ID */}
          <TextSection title={mainContent.myClassroom.title} position="right">
            {mainContent.myClassroom.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </TextSection>
        </section>

        {/* ---- my classroom carousel ---- */}
        <section>
          <ImageCarousel images={imageGalleries[1]} />
        </section>

        {/* ---- Teaching Philosophy ---- */}
        <section id="teachingphilosophy">
          {" "}
          {/* Add this ID */}
          <TextSection
            title={mainContent.teachingPhilosophy.title}
            position="left">
            {mainContent.teachingPhilosophy.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </TextSection>
        </section>

        {/* ---- Third Carousel ---- */}
        <section>
          <ImageCarousel images={mainContent.aboutMeCarousel} />
        </section>

        <Footer />
      </div>
    </>
  );
}
