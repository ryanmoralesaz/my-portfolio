// src/pages/ClassroomTechPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { MobileMenu } from "../components/layout/MobileMenu";
import { ParallaxHero } from "../components/features/ParallaxHero";
import { TextSection } from "../components/ui/TextSection";
import { ImageCarousel } from "../components/ui/ImageCarousel";
import { IframeSection } from "../components/sections/IFrameSection";
import { Footer } from "../components/layout/Footer";
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
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        containerRef={containerRef} // Pass the containerRef here
      />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div ref={containerRef} className="pt-16 fade-transition">
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
            iframeSrc={classroomTechContent.howUseIframe}
          >
            <p className="text-base">{classroomTechContent.howUseText}</p>
            <p className="text-base">{classroomTechContent.howUseText}</p>
          </IframeSection>
          {/* <ImageCarousel images={classroomTechContent.howUseCarousel} /> */}
        </section>
        <section id="teach-technology">
          <TextSection title="How I Teach Technology" position="right">
            <p>{classroomTechContent.digitalCitationText}</p>
            <p>{classroomTechContent.digitalCitationText2}</p>
            <p>{classroomTechContent.digitalCitationText3}</p>
          </TextSection>
          <ImageCarousel
            images={classroomTechContent.digitalCitationCarousel}
          />
        </section>
        <section id="student-learn-tech">
          <TextSection
            title="How My Students Learn with Technology"
            position="left"
          >
            <p>{classroomTechContent.studentEngagementText}</p>
            <p>{classroomTechContent.studentEngagementText2}</p>
            <p>{classroomTechContent.studentEngagementText3}</p>
          </TextSection>
          <ImageCarousel
            images={classroomTechContent.studentEngagementCarousel}
          />
        </section>
        <section id="culturally-relevant-learning">
          <TextSection
            title="Learning Strategies for Social Justice"
            position="right"
          >
            <p>{classroomTechContent.culturallyRelevantText}</p>
          </TextSection>
          {/* <ImageCarousel
            images={classroomTechContent.culturallyRelevantCarousel}
          /> */}
        </section>
        <Footer />
      </div>
    </>
  );
}
