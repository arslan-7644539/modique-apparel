import React from "react";

const BannerSection = ({
  bgImage, // Background image URL
  title, // Title text
  buttonText, // Button text
  onButtonClick, // Button click function (optional)
  subtitle, // Optional subtitle
}) => {
  return (
    <div
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] bg-center bg-cover bg-no-repeat flex items-center justify-center text-white "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight drop-shadow-lg">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-white/90 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {buttonText && (
          <button
            onClick={onButtonClick}
            className="border-2 border-white bg-transparent text-white px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default BannerSection;
