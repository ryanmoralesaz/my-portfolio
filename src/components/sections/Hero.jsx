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

  // Only add image loading state - minimal change
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const getArticle = word => {
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(word[0].toLowerCase()) ? "an" : "a";
  };

  // Simple image preloading
  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    let loadedCount = 0;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setImagesLoaded(true);
      }
    };

    img1.onload = checkLoaded;
    img2.onload = checkLoaded;
    img1.src = "/juliacameron.jpg";
    img2.src = "/ryan-nobg.png";
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Use modern scrollY instead of deprecated pageYOffset
      const newScrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      setScrollY(newScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className="relative w-full h-[420px] flex items-start justify-center overflow-hidden bg-vanilla">

      {/* All visual elements wrapped in a single container that fades in together */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        imagesLoaded ? "opacity-100" : "opacity-0"
      }`}>
        {/* Moving background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/juliacameron.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}></div>

        {/* Electric blue filter overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#6efafb",
            mixBlendMode: "multiply",
            opacity: 0.7,
          }}></div>

        {/* White overlay for upper half */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}></div>
      </div>

      {/* Text content - Always visible, centered in upper half */}
      <div className="absolute top-0 left-0 right-0 h-1/2 flex items-center justify-center z-10">
        <div className="text-center px-4 w-full">
          <h1 className="font-michroma text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-2 leading-tight max-w-4xl mx-auto">
            <span className="text-bluemunsell">Hello, I'm </span>
            <span className="text-flame">Ryan Morales</span>
          </h1>
          <h2 className="font-michroma text-base sm:text-lg md:text-xl lg:text-3xl leading-tight max-w-3xl mx-auto">
            <span className="text-bluemunsell">
              I am {getArticle(words[currentWordIndex])}{" "}
            </span>
            <span className="text-flame">{currentText}</span>
          </h2>
        </div>
      </div>

      {/* Headshot section - Also fades in with images */}
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1/2 flex items-end justify-center transition-opacity duration-500 ${
        imagesLoaded ? "opacity-100" : "opacity-0"
      }`}>
        {/* Gradient half oval background (shrunk by 10%) */}
        <div
          className="absolute bottom-0 z-0 rounded-t-full hidden sm:block"
          style={{
            width: "126%",
            height: "72%",
            background: "linear-gradient(to right, #0091ad, #6efafb)",
            transform: "translateY(0)",
          }}></div>

        {/* Flame‐colored rectangle frame */}
        <div
          className="absolute bottom-0 w-4/5 h-6/10 z-10"
          style={{ backgroundColor: "#d75412" }}></div>

        {/* Headshot image */}
        <img
          src="/ryan-nobg.png"
          alt="Ryan Morales"
          className="absolute bottom-0 w-4/5 h-full object-cover object-top z-20"
        />
      </div>

      {/* Attribution - fades in with images */}
      <div className={`absolute bottom-0 right-0 text-xs text-black/50 p-2 transition-opacity duration-500 ${
        imagesLoaded ? "opacity-100" : "opacity-0"
      }`}>
        CC0 Julia Cameron
      </div>
    </section>
  );
};