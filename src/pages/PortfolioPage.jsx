// src/pages/PortfolioPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { MobileMenu } from "../components/layout/MobileMenu";
import { ParallaxHero } from "../components/features/ParallaxHero";
import { TextSection } from "../components/ui/TextSection"; // Using new consolidated component
import { ImageCarousel } from "../components/ui/ImageCarousel";
import { Footer } from "../components/layout/Footer";
import { portfolioContent } from "../data/portfolioContent";

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const container = containerRef.current;
      if (!container) return;
      container.style.opacity = "0.3";
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
        container.style.opacity = "1";
      }, 400);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div ref={containerRef} className="pt-16 fade-transition">
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Parallax Hero Section */}
        <ParallaxHero
          backgroundImage="/sora.jpg"
          title="My Portfolio"
          height="400px"
          overlayOpacity={0.7}
          attribution="CC0 Sora Shimazaki"
        />

        <section id="portfolio">
          <TextSection title="Portfolio" position="left">
            {portfolioContent.portfolioText.map((para, index) => (
              <p key={index} className="mb-4">
                {para}
              </p>
            ))}
          </TextSection>
        </section>

        <section id="community-engagement">
          <TextSection title="Community Engagement Strategies" position="right">
            <p>{portfolioContent.communityText}</p>
          </TextSection>
          <ImageCarousel images={portfolioContent.communityCarousel} />
        </section>

        <section id="lesson-plans">
          <TextSection title="My Lesson Plans" position="left">
            <p>{portfolioContent.lessonPlansText}</p>
          </TextSection>
        </section>

        <Footer />
      </div>
    </>
  );
}