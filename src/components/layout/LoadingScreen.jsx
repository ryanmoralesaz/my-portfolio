// src/components/layout/LoadingScreen.jsx
import { useState, useEffect } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "How are you, today?";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(var(--oldlace)/1)] text-bluemunsell flex flex-col items-center justify-center px-4">
      {/* Text with responsive sizing and proper line height */}
      <div className="mb-8 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-michroma font-bold text-center leading-tight max-w-sm sm:max-w-md md:max-w-lg">
        <span className="inline-block">{text}</span>
        <span className="animate-blink ml-1 inline-block">|</span>
      </div>

      {/* Loading bar with responsive width */}
      <div className="w-[150px] sm:w-[200px] md:w-[250px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};