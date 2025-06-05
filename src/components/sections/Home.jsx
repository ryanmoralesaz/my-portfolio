import { useMemo, useState, useEffect } from "react";

export const Home = () => {
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

  const getArticle = word => {
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(word[0].toLowerCase()) ? "an" : "a";
  };

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
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
      className="relative w-full h-[420px] flex items-start justify-center overflow-hidden">
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

      {/* White overlay for upper third */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}></div>

      {/* Text content */}
      <div className="relative z-10 text-center pt-16 mt-5">
        <h1 className="font-michroma text-5xl mb-2">
          <span className="text-bluemunsell">Hello, I'm </span>
          <span className="text-flame">Ryan Morales</span>
        </h1>
        <h2 className="font-michroma text-3xl">
          <span className="text-bluemunsell">
            I am {getArticle(words[currentWordIndex])}{" "}
          </span>
          <span className="text-flame">{currentText}</span>
        </h2>
      </div>

      {/* Headshot section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1/2 flex items-end justify-center">
        {/* Gradient half oval background (shrunk by 10%) */}
        <div
          className="absolute bottom-0 z-0 rounded-t-full animate-fadeIn"
          style={{
            width: "126%", // 140% × 0.9 ≈ 126%
            height: "72%", //  80% × 0.9 = 72%
            background: "linear-gradient(to right, #0091ad, #6efafb)",
            transform: "translateY(0)", // still a half‐oval shape via rounded‐t-full
          }}></div>

        {/* Flame‐colored rectangle frame */}
        <div
          className="absolute bottom-0 w-4/5 h-6/10 z-10 animate-fadeIn"
          style={{ backgroundColor: "#d75412" }}></div>

        {/* Headshot image */}
        <img
          src="/ryan-nobg.png"
          alt="Ryan Morales"
          className="absolute bottom-0 w-4/5 h-full object-cover object-top z-20 animate-fadeIn"
        />
      </div>
      {/* attribution section */}
      <div className="absolute bottom-0 right-0">CC0 Julia Cameron</div>
    </section>
  );
};
