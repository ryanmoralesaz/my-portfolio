// src/components/sections/ImageCarousel.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export function ImageCarousel({ images, autoPlayInterval = 2500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // NEW: track if user has paused by clicking an arrow
  const [isPausedByClick, setIsPausedByClick] = useState(false);

  // Keep the old “pause on hover center image”
  const [isHovered, setIsHovered] = useState(false);

  // IntersectionObserver: ref, isVisible, hasBeenVisible
  const [ref, isVisible, hasBeenVisible] = useIntersectionObserver();

  // intervalRef holds the setInterval ID (or null)
  const intervalRef = useRef(null);
  const transitionDelay = 500;

  // ── Helper to advance to next slide ───────────────────────
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), transitionDelay);
  }, [isTransitioning, images.length]);

  // ── Helper to go to previous slide ───────────────────────
  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), transitionDelay);
  };

  // ── AUTO-PLAY EFFECT ─────────────────────────────────────
  useEffect(() => {
    // 1) Clear any existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 2) Start autoplay as soon as:
    //    • hasBeenVisible is true (i.e. it has faded in once)
    //    • NOT hovering center image
    //    • NOT paused by clicking an arrow
    //    • images.length > 1
    if (hasBeenVisible && !isHovered && !isPausedByClick && images.length > 1) {
      intervalRef.current = window.setInterval(goToNext, autoPlayInterval);
    }

    // 3) Cleanup on unmount or whenever dependencies change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    hasBeenVisible,
    isHovered,
    isPausedByClick,
    goToNext,
    autoPlayInterval,
    images.length,
  ]);
  // ──────────────────────────────────────────────────────────

  // ── RESET “paused-by-click” WHEN CAROUSEL LEAVES THE VIEWPORT ──
  // If user scrolls away so that isVisible becomes false, reset isPausedByClick:
  useEffect(() => {
    if (!isVisible) {
      setIsPausedByClick(false);
    }
  }, [isVisible]);

  // ── UTILITY: wrap index around [-1, 0, +1] ─────────────────
  const getImageIndex = (offset) => {
    const idx = currentIndex + offset;
    if (idx < 0) return images.length + idx;
    if (idx >= images.length) return idx - images.length;
    return idx;
  };

  // ── UTILITY: pick the Tailwind transform class for offset ────
  const getTransformClass = (offset) => {
    if (offset === -1) return "orbit-left";
    if (offset === 0) return "orbit-center";
    if (offset === 1) return "orbit-right";
    return "hidden";
  };

  return (
    // ── OUTERMOST WRAPPER: clear isPausedByClick on mouse leave here ──
    <div
      className="w-full h-[350px] flex items-center justify-center relative"
      style={{ backgroundColor: "#0091ad" }}
      onMouseLeave={() => {
        // When user moves mouse completely off the carousel,
        // resume autoplay if it was paused by clicking
        setIsPausedByClick(false);
      }}
    >
      <div
        ref={ref}
        className={`w-full h-full flex items-center justify-center relative transition-all duration-1000 ease-out ${
          hasBeenVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        {/* ── LEFT ARROW ── */}
        <button
          onClick={() => {
            goToPrevious();
            setIsPausedByClick(true); // PAUSE as soon as user clicks
          }}
          disabled={isTransitioning}
          className={`absolute left-10 z-30 p-3 rounded-full bg-[rgb(var(--vanilla)/1))] hover:bg-[#5de9ea] shadow-lg transition-all duration-200 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : ""
          } ${
            hasBeenVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-flame text-xl font-bold">‹</span>
        </button>

        {/* ── THE THREE IMAGES (offset -1, 0, +1) ── */}
        <div className="flex items-center justify-center space-x-6 relative w-[300px] h-[300px] perspective">
          {[-1, 0, 1].map((offset) => {
            const idx = getImageIndex(offset);
            const image = images[idx];

            // If string => { src: string, orientation: "landscape" }
            const src = typeof image === "string" ? image : image.src;
            const description =
              typeof image === "string" ? "" : image.description || "";
            const orientation =
              typeof image === "string"
                ? "landscape"
                : image.orientation || "landscape";

            const sizeClass =
              orientation === "portrait"
                ? "w-[180px] h-[240px]"
                : "w-[240px] h-[180px]";

            // Only the **center image** (offset === 0) receives hover handlers
            const wrapperProps =
              offset === 0
                ? {
                    onMouseEnter: () => setIsHovered(true),
                    onMouseLeave: () => setIsHovered(false),
                  }
                : {};

            return (
              <div
                key={`${idx}-${offset}`}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           transition-all duration-500 ease-in-out transform-gpu
                           ${sizeClass} ${getTransformClass(offset)}`}
                {...wrapperProps}
              >
                <img
                  src={src}
                  alt={description}
                  className={`w-full h-full object-cover rounded-xl shadow-xl ${
                    orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
                {description && (
                  <div className="absolute bottom-0 w-full text-center bg-[#003d4d]/80 text-white text-sm py-1 rounded-b-xl">
                    {description}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── RIGHT ARROW ── */}
        <button
          onClick={() => {
            goToNext();
            setIsPausedByClick(true); // PAUSE as soon as user clicks
          }}
          disabled={isTransitioning}
          className={`absolute right-10 z-30 p-3 rounded-full bg-[rgb(var(--vanilla)/1))] hover:bg-[#5de9ea] shadow-lg transition-all duration-200 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : ""
          } ${
            hasBeenVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-flame text-xl font-bold">›</span>
        </button>

        {/* ── DOTS ── */}
        <div
          className={`absolute bottom-4 flex space-x-2 transition-all duration-500 ${
            hasBeenVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isTransitioning) {
                  setCurrentIndex(i);
                  setIsPausedByClick(true); // also pause if user clicks on a dot
                }
              }}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                i === currentIndex ? "bg-[#6efafb]" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
