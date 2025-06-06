// src/components/features/ParallaxHero.jsx
import React, { useState, useEffect } from "react";

export const ParallaxHero = ({
  backgroundImage,
  title,
  height = "400px",
  overlayOpacity = 0, // Default to no overlay
  attribution,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = backgroundImage;
  }, [backgroundImage]);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-vanilla"
      style={{ height }}>

      {/* Background wrapper that fades in when loaded */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-out ${
        imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
      }`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: "fixed",
          }}
        />

        {/* Overlay - Only render if opacity > 0 */}
        {overlayOpacity > 0 && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>

      {/* Content - Always visible */}
      <div className="relative text-center px-4 z-10">
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 transition-all duration-1000 ease-out ${
          imageLoaded ? "text-white drop-shadow-lg" : "text-flame"
        }`}>
          {title}
        </h1>
      </div>

      {/* Attribution - fades in with background */}
      {attribution && (
        <div className={`absolute bottom-2 right-2 text-xs p-1 transition-all duration-1000 ease-out delay-300 ${
          imageLoaded ? "opacity-100 text-white/70 drop-shadow" : "opacity-0"
        }`}>
          {attribution}
        </div>
      )}
    </section>
  );
};