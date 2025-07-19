import { useRef, useState, useEffect } from "react";

export function useIntersectionObserver(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    if (window.scrollY > 50) {
      setHasScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // Modified logic: Allow first section to trigger without scrolling
        const element = elementRef.current;
        const isFirstSection = element && element.closest('#whoami'); // Check if it's the first content section

        if (entry.isIntersecting && !hasBeenVisible) {
          // For first section OR if user has scrolled
          if (isFirstSection || hasScrolled) {
            setHasBeenVisible(true);
          }
        }
      },
      {
        threshold: 0.1, // Much lower threshold - trigger when 10% is visible
        rootMargin: "0px 0px -50px 0px", // Less aggressive margin
        ...options,
      }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [hasBeenVisible, hasScrolled, options]);

  return [elementRef, isVisible, hasBeenVisible];
}