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
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const getArticle = (word) => {
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(word[0].toLowerCase()) ? "an" : "a";
  };

  // Preload background
  useEffect(() => {
    const img1 = new Image();
    img1.onload = () => setImagesLoaded(true);
    img1.src = "/juliacameron.jpg";
  }, []);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      const newScroll = window.scrollY;
      setScrollY(newScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
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
      className="relative w-full h-[420px] flex items-start justify-center overflow-hidden bg-vanilla"
    >
      {/* All visual elements fade in together */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          imagesLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/juliacameron.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>

        {/* Electric‐blue overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#6efafb",
            mixBlendMode: "multiply",
            opacity: 0.7,
          }}
        ></div>

        {/* White overlay for upper half */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        ></div>
      </div>

      {/* Text content (always visible) */}
      <div className="absolute top-0 left-0 right-0 h-1/2 flex items-center justify-center z-10">
        <div className="text-center px-4 w-full">
          <h1 className="font-michroma text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-2 leading-tight max-w-4xl mx-auto">
            <span className="text-bluemunsell">Hello, I’m </span>
            <span className="text-flame">Ryan Morales</span>
          </h1>
          <h2 className="font-michroma text-base sm:text-lg md:text-xl lg:text-3xl leading-tight max-w-3xl mx-auto">
            <span className="text-bluemunsell">
              I am {getArticle(words[currentWordIndex])}
            </span>
            <span className="text-flame"> {currentText}</span>
          </h2>
        </div>
      </div>

      {/* Headshot + rectangle (bottom third) */}
      <div
        className={`absolute bottom-0
          left-[33%] sm:left-1/2
          transform -translate-x-1/2
          w-1/3 sm:w-1/4
          h-1/2
          flex items-end justify-center
          transition-all duration-1000 ease-out delay-300 ${
            imagesLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
      >
        {/* Flame‐colored rectangle (always starts at left edge on mobile) */}
        <div
          className="absolute bottom-0 left-0 z-10
            w-[150%] sm:w-4/5
            h-[60%] sm:h-[60%]
            bg-[rgb(var(--flame)/1)]"
        ></div>
      </div>

      {/* Attribution */}
      <div
        className={`absolute bottom-0 right-0 text-xs text-black/50 p-2 transition-all duration-1000 ease-out delay-500 ${
          imagesLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        CC0 Julia Cameron
      </div>
    </section>
  );
};
