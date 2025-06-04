import { useState } from "react";

export const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getImageIndex = offset => {
    const index = currentIndex + offset;
    if (index < 0) return images.length + index;
    if (index >= images.length) return index - images.length;
    return index;
  };

  return (
    <div
      className="w-full h-[350px] flex items-center justify-center relative"
      style={{ backgroundColor: "#0091ad" }} // bluemunsell background
    >
      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-80 z-10 p-3 rounded-full bg-[#6efafb] hover:bg-[#5de9ea] transition-colors duration-200 shadow-lg">
        <span className="text-white text-xl font-bold">‹</span>
      </button>

      {/* Images Container */}
      <div className="flex items-center justify-center space-x-4">
        {/* Left Image (smaller) */}
        <div className="transition-all duration-500 ease-in-out">
          <img
            src={images[getImageIndex(-1)]}
            alt="Previous"
            className="w-32 h-48 object-cover rounded-lg shadow-lg opacity-70 transform scale-75"
          />
        </div>

        {/* Center Image (larger) */}
        <div className="transition-all duration-500 ease-in-out">
          <img
            src={images[currentIndex]}
            alt="Current"
            className="w-48 h-72 object-cover rounded-lg shadow-xl transform scale-100"
          />
        </div>

        {/* Right Image (smaller) */}
        <div className="transition-all duration-500 ease-in-out">
          <img
            src={images[getImageIndex(1)]}
            alt="Next"
            className="w-32 h-48 object-cover rounded-lg shadow-lg opacity-70 transform scale-75"
          />
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-80 z-10 p-3 rounded-full bg-[#6efafb] hover:bg-[#5de9ea] transition-colors duration-200 shadow-lg">
        <span className="text-white text-xl font-bold">›</span>
      </button>

      {/* Dots Indicator (optional) */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-[#6efafb]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
