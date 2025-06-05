// src/components/sections/IframeSection.jsx
import React from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export function IframeSection({ title, children, iframeSrc }) {
  const [ref, , hasBeenVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className="w-full h-[450px] flex overflow-hidden"
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

      {/* Content section - middle 2/5 */}
      <div
        className={`w-2/5 p-8 flex flex-col justify-center transition-all duration-1000 ease-out delay-300 ${
          hasBeenVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="text-gray-700 leading-relaxed space-y-4">
          {children}
        </div>
      </div>

      {/* Iframe section - right 2/5 */}
      <div
        className={`w-2/5 p-6 flex items-center justify-center transition-all duration-1000 ease-out delay-500 ${
          hasBeenVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <iframe
            src={iframeSrc}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            width="100%"
            height="100%"
            allowFullScreen
            className="rounded-lg shadow-lg"
            title="3D Room Diagram"
          />
        </div>
      </div>
    </div>
  );
}