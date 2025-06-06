// src/components/sections/Hero.jsx
import { useMemo, useState, useEffect } from "react";

export const Hero = () => {
  const words = useMemo(
    () => [
      "Educator",
      "Teacher",
      "Coach",
      "Mentor",
      "Advisor",
      "Leader",
      "Trainer",
      "Professional",
      "Instructor",
      "Programmer",
    ],
    []
  );

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Image loading states
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [headshotLoaded, setHeadshotLoaded] = useState(false);

  const getArticle = word => {
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(word[0].toLowerCase()) ? "an" : "a";
  };

  // Preload images
  useEffect(() => {
    const backgroundImg = new Image();
    const headshotImg = new Image();

    backgroundImg.onload = () => setBackgroundLoaded(true);
    headshotImg.onload = () => setHeadshotLoaded(true);

    backgroundImg.src = "/juliacameron.jpg";
    headshotImg.src = "/ryan-nobg.png";
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting && !isPaused) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.substring(0, currentText.length + 1));
          } else {
            setIsPaused(true);
          }
        } else if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
        } else if (isDeleting) {
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex(prev => (prev + 1) % words.length);
          }
        }
      },
      isPaused ? 1500 : isDeleting ? 50 : 100
    );
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words]);

  return (
    <section
      id="home"
      className="relative w-full h-[420px] flex items-start justify-center overflow-hidden">
      {/* Background with loading state */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          backgroundLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: backgroundLoaded
            ? `url('/juliacameron.jpg')`
            : "none",
          backgroundColor: backgroundLoaded ? "transparent" : "#0091ad", // Fallback color
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Electric blue filter overlay - only show when background is loaded */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          backgroundLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "#6efafb",
          mixBlendMode: "multiply",
          opacity: 0.7,
        }}
      />

      {/* White overlay for upper third - only show when background is loaded */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 transition-opacity duration-500 ${
          backgroundLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      />

      {/* Text content - responsive sizing */}
      <div className="relative z-10 text-center pt-16 mt-5 px-4">
        <h1 className="font-michroma text-2xl sm:text-3xl lg:text-5xl mb-2 leading-tight">
          <span className="text-bluemunsell">Hello, I'm </span>
          <span className="text-flame">Ryan Morales</span>
        </h1>
        <h2 className="font-michroma text-lg sm:text-xl lg:text-3xl leading-tight">
          <span className="text-bluemunsell">
            I am {getArticle(words[currentWordIndex])}{" "}
          </span>
          <span className="text-flame">{currentText}</span>
        </h2>
      </div>

      {/* Headshot section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1/2 flex items-end justify-center">
        {/* Gradient half oval background - HIDDEN ON MOBILE */}
        <div
          className={`absolute bottom-0 z-0 rounded-t-full hidden sm:block transition-opacity duration-500 ${
            backgroundLoaded ? "animate-fadeIn opacity-100" : "opacity-0"
          }`}
          style={{
            width: "126%",
            height: "72%",
            background: "linear-gradient(to right, #0091ad, #6efafb)",
            transform: "translateY(0)",
          }}
        />

        {/* Flame‐colored rectangle frame */}
        <div
          className={`absolute bottom-0 w-4/5 h-6/10 z-10 transition-opacity duration-500 ${
            headshotLoaded ? "animate-fadeIn opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "#d75412" }}
        />

        {/* Headshot image with loading state */}
        <img
          src="/ryan-nobg.png"
          alt="Ryan Morales"
          className={`absolute bottom-0 w-4/5 h-full object-cover object-top z-20 transition-opacity duration-500 ${
            headshotLoaded ? "animate-fadeIn opacity-100" : "opacity-0"
          }`}
          onLoad={() => setHeadshotLoaded(true)}
        />
      </div>

      {/* Attribution section */}
      <div className="absolute bottom-0 right-0 text-xs md:text-sm p-2">
        CC0 Julia Cameron
      </div>
    </section>
  );
};
