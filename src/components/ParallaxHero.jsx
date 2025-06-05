// src/components/ParallaxHero.jsx
import React, { useEffect, useRef } from "react";

export const ParallaxHero = ({
  backgroundImage,
  title,
  height = "400px",
  overlayOpacity,
  attribution,
}) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !backgroundRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5; // Adjust this value to control parallax speed

      // Only apply parallax when the element is in view
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        backgroundRef.current.style.transform = `translateY(${rate}px)`;
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
      style={{ height }}>
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // This creates additional parallax effect
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgb(255,255,255)]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <h1 className="relative text-4xl md:text-5xl font-bold text-bluemunsell z-10">
        {title}
      </h1>

      {/* attribution section */}
      <div className="absolute bottom-0 right-0 text-bluemunsell p-3">
        {attribution}
      </div>
    </section>
  );
};
