// src/pages/ClassroomTechPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { MobileMenu } from "../components/MobileMenu";
import { ParallaxHero } from "../components/ParallaxHero";
import { LeftTextSection } from "../components/sections/LeftTextSection";
import { RightTextSection } from "../components/sections/RightTextSection";
import { ImageCarousel } from "../components/sections/ImageCarousel";
import { IframeSection } from "../components/sections/IFrameSection";
import { Footer } from "../components/Footer";
import { classroomTechContent } from "../data/classroomTechContent";

export default function ClassroomTechPage() {
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
          backgroundImage="/computer-keyboard.jpg"
          title="Classroom Technology"
          height="400px"
          overlayOpacity={0.8}
          attribution="CC0 Igne B via Unsplash"
        />

        <section id="how-i-use-technology">
          <IframeSection
            title="How I Use Technology"
            iframeSrc={classroomTechContent.howUseIframe}>
            <p>{classroomTechContent.howUseText}</p>
          </IframeSection>
          <ImageCarousel images={classroomTechContent.howUseCarousel} />
        </section>

        <section id="digital-citizenship">
          <RightTextSection title="Digital Citizenship">
            <p>{classroomTechContent.digitalCitationText}</p>
          </RightTextSection>
          <ImageCarousel
            images={classroomTechContent.digitalCitationCarousel}
          />
        </section>

        <section id="student-tech-engagement">
          <LeftTextSection title="Student Technology Engagement">
            <p>{classroomTechContent.studentEngagementText}</p>
          </LeftTextSection>
          <ImageCarousel
            images={classroomTechContent.studentEngagementCarousel}
          />
        </section>

        <section id="culturally-relevant-learning">
          <RightTextSection title="Culturally Relevant Learning Strategies">
            <p>{classroomTechContent.culturallyRelevantText}</p>
          </RightTextSection>
          <ImageCarousel
            images={classroomTechContent.culturallyRelevantCarousel}
          />
        </section>

        <Footer />
      </div>
    </>
  );
}