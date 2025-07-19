// src/components/ui/ImageCarousel.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export function ImageCarousel({ images, autoPlayInterval = 2500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // const [slideDirection, setSlideDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const [ref, isVisible, hasBeenVisible] = useIntersectionObserver();
  const intervalRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const TRANSITION_MS = 300; // match your CSS transition
  const SWIPE_THRESHOLD = 50; // px
  const PAUSE_DURATION = 5000; // ms

  useEffect(() => {
    images.forEach((image) => {
      const src = typeof image === "string" ? image : image.src;
      const img = new Image();
      img.src = src;
    });
  }, [images]);
  // Wrap index into [0..images.length-1]
  const wrapIndex = useCallback(
    (i) => {
      const len = images.length;
      return ((i % len) + len) % len;
    },
    [images.length]
  );

  // Decide each card’s transform/opacity/z-index
  const getCardStyle = useCallback((offset) => {
    // Default fallback
    let baseX = offset * 120;
    let scale = 0.7;
    let opacity = 0.3;
    let zIndex = 1;

    if (offset === 0) {
      baseX = 0;
      scale = 1;
      opacity = 1;
      zIndex = 3;
    } else if (offset === -1 || offset === 1) {
      scale = 0.7;
      opacity = 0.6;
      zIndex = 2;
    } else if (offset === -2 || offset === 2) {
      scale = 0.6;
      opacity = 0.3;
      zIndex = 1;
    }

    return {
      transform: `translate(-50%, -50%) translateX(${baseX}%) scale(${scale})`,
      opacity,
      zIndex,
    };
  }, []);

  // Clear both auto-play interval & pause timeout
  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  // Temporarily pause autoplay
  const pauseTemporarily = useCallback(() => {
    clearAllTimers();
    setIsPaused(true);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_DURATION);
  }, [clearAllTimers]);

  // “Next” card (delay index change by TRANSITION_MS+50 to avoid blink)
  const nextCard = useCallback(() => {
    if (isTransitioning || images.length <= 1) return;
    clearAllTimers();
    setIsTransitioning(true);
    // setSlideDirection("next");
    const nextIdx = wrapIndex(currentIndex + 1);

    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setIsTransitioning(false);
    }, TRANSITION_MS);
  }, [isTransitioning, images.length, wrapIndex, currentIndex, clearAllTimers]);

  // “Prev” card
  const prevCard = useCallback(() => {
    if (isTransitioning || images.length <= 1) return;
    clearAllTimers();
    setIsTransitioning(true);
    // setSlideDirection("prev");
    const prevIdx = wrapIndex(currentIndex - 1);

    setTimeout(() => {
      setCurrentIndex(prevIdx);
      setIsTransitioning(false);
    }, TRANSITION_MS);
  }, [isTransitioning, images.length, wrapIndex, currentIndex, clearAllTimers]);

  // Jump directly to a dot index
  const goToIndex = useCallback(
    (targetIndex) => {
      if (isTransitioning || targetIndex === currentIndex) return;
      clearAllTimers();
      setIsTransitioning(true);
      // const forwardDist = wrapIndex(targetIndex - currentIndex);
      // const backwardDist = wrapIndex(currentIndex - targetIndex);
      // setSlideDirection(forwardDist <= backwardDist ? "next" : "prev");
      setTimeout(() => {
        setCurrentIndex(targetIndex);
        setIsTransitioning(false);
      }, TRANSITION_MS);
      pauseTemporarily();
    },
    [isTransitioning, currentIndex, clearAllTimers, pauseTemporarily]
  );

  // Swipe handlers
  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const dist = touchStartX - touchEndX;
    if (dist > SWIPE_THRESHOLD) {
      nextCard();
      pauseTemporarily();
    } else if (dist < -SWIPE_THRESHOLD) {
      prevCard();
      pauseTemporarily();
    }
  };

  // Auto-play effect
  useEffect(() => {
    clearAllTimers();
    if (
      hasBeenVisible &&
      !isHovered &&
      !isPaused &&
      !isTransitioning &&
      images.length > 1
    ) {
      intervalRef.current = setInterval(() => {
        nextCard();
      }, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    hasBeenVisible,
    isHovered,
    isPaused,
    isTransitioning,
    images.length,
    nextCard,
    autoPlayInterval,
    clearAllTimers,
  ]);

  // Reset pause when carousel scrolls out of view
  useEffect(() => {
    if (!isVisible) {
      clearAllTimers();
      setIsPaused(false);
    }
  }, [isVisible, clearAllTimers]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-visible py-8 sm:py-12 bg-[rgb(var(--bluemunsell))]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Invisible overlay for IntersectionObserver */}
      <div ref={ref} className="absolute inset-0"></div>

      {/* ← Left Arrow Button → */}
      <button
        onClick={() => {
          prevCard();
          pauseTemporarily();
        }}
        disabled={isTransitioning}
        className={`absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-[rgb(var(--vanilla)/1)] hover:bg-[#5de9ea] shadow-lg transition-opacity ${
          isTransitioning ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
      >
        <span className="text-flame text-xl sm:text-2xl font-bold">‹</span>
      </button>

      {/* ── The Three Cards “On-Stage” ── */}
      <div className="w-full h-[300px] sm:h-[400px] relative">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const idx = wrapIndex(currentIndex + offset);
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
              ? "w-[140px] sm:w-[160px] md:w-[200px] h-[180px] sm:h-[200px] md:h-[240px]"
              : "w-[180px] sm:w-[200px] md:w-[260px] h-[140px] sm:h-[160px] md:h-[200px]";

          const inlineStyle = {
            position: "absolute",
            top: "50%",
            left: "50%",
            willChange: "transform, opacity",
            ...getCardStyle(offset),
            transition: `transform ${TRANSITION_MS}ms ease, opacity ${TRANSITION_MS}ms ease`,
          };

          return (
            <div
              key={idx}
              className={`${sizeClass} transform-gpu`}
              style={inlineStyle}
            >
              <img
                src={src}
                alt={description}
                className={`w-full h-full object-fit rounded-xl shadow-xl transition-opacity duration-500 ease-in-out ${
                  orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
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

      {/* → Right Arrow Button → */}
      <button
        onClick={() => {
          nextCard();
          pauseTemporarily();
        }}
        disabled={isTransitioning}
        className={`absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-[rgb(var(--vanilla)/1)] hover:bg-[#5de9ea] shadow-lg transition-opacity ${
          isTransitioning ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
      >
        <span className="text-flame text-xl sm:text-2xl font-bold">›</span>
      </button>

      {/* ••• Dot Indicators ••• */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            disabled={isTransitioning}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-[#6efafb] scale-125"
                : "bg-white/50 hover:bg-white/70"
            } ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}`}
          />
        ))}
      </div>
    </div>
  );
}
