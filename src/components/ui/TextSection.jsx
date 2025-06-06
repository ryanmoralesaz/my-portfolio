// src/components/ui/TextSection.jsx
import React from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export function TextSection({
  title,
  children,
  position = "left", // 'left' | 'right' | 'center'
  className = "",
  id,
}) {
  const [ref, , hasBeenVisible] = useIntersectionObserver();
  const isLeft = position === "left";
  const isCenter = position === "center";

  if (isCenter) {
    return (
      <div
        id={id}
        ref={ref}
        className={`w-full min-h-[400px] flex items-center justify-center bg-[rgb(var(--oldlace))] ${className}`}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2
            className={`text-flame font-michroma text-xl md:text-3xl font-bold mb-8 transition-all duration-1000 ease-out leading-tight ${
              hasBeenVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}>
            {title}
          </h2>
          <div
            className={`text-gray-700 leading-relaxed space-y-4 transition-all duration-1000 ease-out delay-300 text-sm md:text-base ${
              hasBeenVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      ref={ref}
      className={`w-full min-h-[400px] flex flex-col md:flex-row overflow-hidden bg-[rgb(var(--oldlace)/1)] ${className}`}>
      {/* Title section */}
      <div
        className={`w-full md:w-1/5 flex items-center justify-center p-6 transition-all duration-1000 ease-out order-1 ${
          isLeft ? "md:order-1" : "md:order-3"
        } ${
          hasBeenVisible
            ? "translate-x-0 opacity-100"
            : isLeft
            ? "-translate-x-full opacity-0"
            : "translate-x-full opacity-0"
        }`}>
        <h2 className="text-flame font-michroma text-xl md:text-2xl font-bold text-center leading-tight">
          {title}
        </h2>
      </div>

      {/* Content section */}
      <div
        className={`w-full md:w-4/5 p-6 md:p-8 flex flex-col justify-center transition-all duration-1000 ease-out delay-300 order-2 ${
          isLeft ? "md:order-2" : "md:order-1"
        } ${
          hasBeenVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}>
        <div className="text-gray-700 leading-relaxed space-y-4 max-w-3xl text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}
