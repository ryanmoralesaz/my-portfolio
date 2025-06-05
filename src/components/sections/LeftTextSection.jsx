import React from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export function LeftTextSection({ title, children }) {
  // Ref-only hook call: we ignore isVisible, only use hasBeenVisible
  const [ref, , hasBeenVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className="w-full h-[350px] flex overflow-hidden"
      style={{ backgroundColor: "#f8f5f5" }}
    >
      {/* Title section - left 1/5 */}
      <div
        className={`w-1/5 flex items-center justify-center p-6 transition-all duration-1000 ease-out ${
          hasBeenVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <h2 className="text-flame font-michroma text-2xl font-bold text-center">
          {title}
        </h2>
      </div>
      {/* Content section - right 4/5 */}
      <div
        className={`w-4/5 p-8 flex flex-col justify-center transition-all duration-1000 ease-out delay-300 ${
          hasBeenVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="text-gray-700 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
