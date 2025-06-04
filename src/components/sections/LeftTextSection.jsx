export const LeftTextSection = ({ title, children }) => {
  return (
    <div
      className="w-full h-[350px] flex"
      style={{ backgroundColor: "#f8f5f5" }}>
      {/* Title section - left 1/5 */}
      <div className="w-1/5 flex items-center justify-center p-6">
        <h2 className="text-flame font-michroma text-2xl font-bold text-center">
          {title}
        </h2>
      </div>

      {/* Content section - right 4/5 */}
      <div className="w-4/5 p-8 flex flex-col justify-center">
        <div className="text-gray-700 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
