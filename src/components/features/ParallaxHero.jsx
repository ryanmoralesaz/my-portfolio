// src/components/features/ParallaxHero.jsx
import React, { useEffect, useRef, useState } from "react";

export const ParallaxHero = ({
  backgroundImage,
  title,
  height = "400px",
  overlayOpacity,
  attribution,
}) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.pageYOffset;
      setScrollY(newScrollY);

      if (!heroRef.current || !backgroundRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();

      // Only apply parallax when the element is in view or near view
      if (rect.bottom >= -100 && rect.top <= window.innerHeight + 100) {
        // Use the same parallax calculation as your Hero component
        const parallaxOffset = newScrollY * 0.3;
        backgroundRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height }}
    >
      {/* Parallax Background - Fixed like your Hero component */}
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // Remove backgroundAttachment: "fixed" - this was causing the issue
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgb(255,255,255)]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <h1 className="relative text-4xl md:text-5xl font-bold text-bluemunsell z-10 font-michroma">
        {title}
      </h1>

      {/* Attribution section */}
      <div className="absolute bottom-0 right-0 text-bluemunsell p-3 text-sm">
        {attribution}
      </div>
    </section>
  );
};