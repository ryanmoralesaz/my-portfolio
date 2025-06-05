import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { LeftTextSection } from "./components/sections/LeftTextSection";
import { RightTextSection } from "./components/sections/RightTextSection";
import { ImageCarousel } from "./components/sections/ImageCarousel";
import { Footer } from "./components/Footer";
// If About/Projects are commented out, keep their imports commented or delete them
// import { About } from "./components/sections/About";
// import { Projects } from "./components/sections/Projects";

import { textSections, imageGalleries } from "./data/content";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to top after loading screen completes
  const handleLoadingComplete = () => {
    setIsLoaded(true);
    // Small delay so that the opacity transition starts smoothly
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 100);
  };

  // Also scroll to top on mount (for page refreshes)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-[rgba(var(--vanilla)/1)] text-gray-800`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="max-w-[1200px] mx-auto">
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Home />

          <LeftTextSection title={textSections.whoAmI.title}>
            {textSections.whoAmI.content.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </LeftTextSection>

          <ImageCarousel images={imageGalleries[0]} />

          <RightTextSection title={textSections.myClassroom.title}>
            {textSections.whoAmI.content.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </RightTextSection>

          <ImageCarousel images={imageGalleries[1]} />

          <LeftTextSection title={textSections.teachingPhilosophy.title}>
            {textSections.whoAmI.content.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </LeftTextSection>

          <ImageCarousel
            images={[
              "/juliacameron.jpg",
              "/ryan-nobg.png",
              "/juliacameron.jpg",
            ]}
          />

          {/* <About /> */}
          {/* <Projects /> */}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
