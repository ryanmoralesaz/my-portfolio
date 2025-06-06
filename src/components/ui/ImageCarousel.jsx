// src/components/ui/ImageCarousel.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export function ImageCarousel({ images, autoPlayInterval = 2500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPausedByClick, setIsPausedByClick] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Swipe functionality state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Animation state for smoother transitions
  const [animationPhase, setAnimationPhase] = useState('stable'); // 'stable', 'fadeOut', 'fadeIn'

  const [ref, isVisible, hasBeenVisible] = useIntersectionObserver();
  const intervalRef = useRef(null);
  const carouselRef = useRef(null); // Add ref for carousel container
  const transitionDelay = 600; // Increased for smoother animations

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // ── Enhanced transition with fade and scale ───────────────────────
  const performTransition = useCallback((direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setAnimationPhase('fadeOut');

    // After fade out, change image
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      setAnimationPhase('fadeIn');
    }, 200);

    // Complete transition
    setTimeout(() => {
      setAnimationPhase('stable');
      setIsTransitioning(false);
    }, transitionDelay);
  }, [isTransitioning, images.length]);

  const goToNext = useCallback(() => performTransition('next'), [performTransition]);
  const goToPrevious = useCallback(() => performTransition('prev'), [performTransition]);

  // ── Touch/Swipe handlers with proper event listener setup ─────────────────────────────────────
  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    // Prevent page scrolling during swipe
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
      setIsPausedByClick(true);
    } else if (isRightSwipe) {
      goToPrevious();
      setIsPausedByClick(true);
    }
  }, [touchStart, touchEnd, goToNext, goToPrevious, minSwipeDistance]);

  // Setup non-passive event listeners
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Add non-passive event listeners
    carousel.addEventListener('touchstart', handleTouchStart, { passive: false });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      // Cleanup
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // ── AUTO-PLAY EFFECT ─────────────────────────────────────
  useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (hasBeenVisible && !isHovered && !isPausedByClick && images.length > 1) {
      intervalRef.current = window.setInterval(goToNext, autoPlayInterval);
    }

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

  // ── RESET "paused-by-click" WHEN CAROUSEL LEAVES THE VIEWPORT ──
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

  // ── Enhanced transform class with animation phases ────
  const getTransformClass = (offset) => {
    const baseClass = offset === -1 ? "orbit-left" : offset === 0 ? "orbit-center" : offset === 1 ? "orbit-right" : "hidden";

    // Add animation phase modifiers
    if (offset === 0) { // Only animate the center image
      if (animationPhase === 'fadeOut') {
        return `${baseClass} scale-75 opacity-30`;
      } else if (animationPhase === 'fadeIn') {
        return `${baseClass} scale-110`;
      }
    }

    return baseClass;
  };

  return (
    <div
      ref={carouselRef} // Add the ref here
      className="w-full h-[350px] flex items-center justify-center relative select-none carousel-container"
      style={{
        backgroundColor: "#0091ad",
        touchAction: "pan-y" // Allow vertical scrolling but prevent horizontal
      }}
      onMouseLeave={() => setIsPausedByClick(false)}
      // Remove the onTouch handlers since we're using addEventListener
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
            setIsPausedByClick(true);
          }}
          disabled={isTransitioning}
          className={`absolute left-4 md:left-10 z-30 p-2 md:p-3 rounded-full bg-[rgb(var(--vanilla)/1)] hover:bg-[#5de9ea] shadow-lg transition-all duration-200 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : ""
          } ${
            hasBeenVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-flame text-lg md:text-xl font-bold">‹</span>
        </button>

        {/* ── THE THREE IMAGES (offset -1, 0, +1) ── */}
        <div className="flex items-center justify-center space-x-6 relative w-[250px] md:w-[300px] h-[250px] md:h-[300px] perspective">
          {[-1, 0, 1].map((offset) => {
            const idx = getImageIndex(offset);
            const image = images[idx];

            const src = typeof image === "string" ? image : image.src;
            const description =
              typeof image === "string" ? "" : image.description || "";
            const orientation =
              typeof image === "string"
                ? "landscape"
                : image.orientation || "landscape";

            const sizeClass =
              orientation === "portrait"
                ? "w-[140px] md:w-[180px] h-[180px] md:h-[240px]"
                : "w-[180px] md:w-[240px] h-[140px] md:h-[180px]";

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
                  className={`w-full h-full object-cover rounded-xl shadow-xl transition-all duration-300 ease-in-out ${
                    orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                  } ${
                    offset === 0 && animationPhase === 'fadeIn' ? 'animate-pulse' : ''
                  }`}
                  draggable={false}
                />
                {description && (
                  <div className="absolute bottom-0 w-full text-center bg-[#003d4d]/80 text-white text-xs md:text-sm py-1 rounded-b-xl">
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
            setIsPausedByClick(true);
          }}
          disabled={isTransitioning}
          className={`absolute right-4 md:right-10 z-30 p-2 md:p-3 rounded-full bg-[rgb(var(--vanilla)/1)] hover:bg-[#5de9ea] shadow-lg transition-all duration-200 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : ""
          } ${
            hasBeenVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-flame text-lg md:text-xl font-bold">›</span>
        </button>

        {/* ── DOTS ── */}
        <div
          className={`absolute bottom-2 md:bottom-4 flex space-x-2 transition-all duration-500 ${
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
                  setIsPausedByClick(true);
                }
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-[#6efafb] scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* ── SWIPE INDICATOR (optional visual feedback) ── */}
        <div className="absolute top-2 right-2 text-white/50 text-xs hidden md:block">
          Swipe or click to navigate
        </div>
      </div>
    </div>
  );
}