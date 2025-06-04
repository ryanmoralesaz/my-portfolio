import { useState } from "react";
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
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";

import { textSections, imageGalleries } from "./data/content.js";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />} */}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-[rgba(var(--vanilla)/1)] text-gray-800`}>
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
            ]}></ImageCarousel>
          {/* <About /> */}
          {/* <Projects /> */}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
