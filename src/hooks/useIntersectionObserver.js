import { useRef, useState, useEffect } from "react";

/**
 * A simple IntersectionObserver hook in plain JS.
 *
 * Returns: [ref, isVisible, hasBeenVisible]
 *  - ref: attach to your <div ref={ref}>…
 *  - isVisible: true/false as soon as the element intersects
 *  - hasBeenVisible: flips true once it intersects after the user has scrolled 50px
 */
export function useIntersectionObserver(options = {}) {
  // 1) useRef(null) ⇒ ref.current is either the element or null
  const elementRef = useRef(null);

  // 2) Track whether it’s currently intersecting
  const [isVisible, setIsVisible] = useState(false);

  // 3) Track if it’s ever become visible (after the user scrolled down 50px)
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // 4) Track if user has scrolled at all
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5) Set up the IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenVisible && hasScrolled) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -100px 0px",
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
