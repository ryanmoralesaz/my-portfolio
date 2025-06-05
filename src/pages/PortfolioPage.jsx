// src/pages/PortfolioPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { MobileMenu } from "../components/MobileMenu";
import { ParallaxHero } from "../components/ParallaxHero";
import { LeftTextSection } from "../components/sections/LeftTextSection";
import { RightTextSection } from "../components/sections/RightTextSection";
import { ImageCarousel } from "../components/sections/ImageCarousel";
import { Footer } from "../components/Footer";
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
          <LeftTextSection title="Portfolio">
            {portfolioContent.portfolioText.map((para, index) => (
              <p key={index} className="mb-4">
                {para}
              </p>
            ))}
          </LeftTextSection>
        </section>

        <section id="community-engagement">
          <RightTextSection title="Community Engagement Strategies">
            <p>{portfolioContent.communityText}</p>
          </RightTextSection>
          <ImageCarousel images={portfolioContent.communityCarousel} />
        </section>

        <section id="lesson-plans">
          <LeftTextSection title="My Lesson Plans">
            <p>{portfolioContent.lessonPlansText}</p>
          </LeftTextSection>
        </section>

        <Footer />
      </div>
    </>
  );
}