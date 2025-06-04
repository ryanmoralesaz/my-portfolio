import { useState } from "react";

export const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionDelay = 500;

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), transitionDelay);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), transitionDelay);
  };

  const getImageIndex = offset => {
    const index = currentIndex + offset;
    if (index < 0) return images.length + index;
    if (index >= images.length) return index - images.length;
    return index;
  };

  const getTransformClass = offset => {
    if (offset === -1) return "orbit-left";
    if (offset === 0) return "orbit-center";
    if (offset === 1) return "orbit-right";
    return "hidden";
  };

  return (
    <div
      className="w-full h-[350px] flex items-center justify-center relative"
      style={{ backgroundColor: "#0091ad" }}>
      {/* Arrows */}
      <button
        onClick={goToPrevious}
        disabled={isTransitioning}
        className={`absolute left-10 z-30 p-3 rounded-full bg-[#6efafb] hover:bg-[#5de9ea] shadow-lg ${
          isTransitioning ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        <span className="text-white text-xl font-bold">‹</span>
      </button>

      <div className="flex items-center justify-center space-x-6 relative w-[300px] h-[300px] perspective">
        {[-1, 0, 1].map(offset => {
          const index = getImageIndex(offset);
          const { src, description, orientation } = images[index];
          const sizeClass =
            orientation === "portrait"
              ? "w-[180px] h-[240px]"
              : "w-[240px] h-[180px]";

          return (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out transform-gpu ${sizeClass} ${getTransformClass(
                offset
              )}`}>
              <img
                src={src}
                alt={description}
                className={`w-full h-full object-cover rounded-xl shadow-xl ${
                  orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              />
              <div className="absolute bottom-0 w-full text-center bg-[#003d4d]/80 text-white text-sm py-1">
                {description}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={goToNext}
        disabled={isTransitioning}
        className={`absolute right-10 z-30 p-3 rounded-full bg-[#6efafb] hover:bg-[#5de9ea] shadow-lg ${
          isTransitioning ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        <span className="text-white text-xl font-bold">›</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-[#6efafb]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
