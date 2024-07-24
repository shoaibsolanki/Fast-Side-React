import React, { useState } from "react";
import mainposter from ".././imgs/Mainposter.jpg";

const HeroSection = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mx-auto my-4">
      {isLoading && <ImageSkeleton />}
      <img
        src={mainposter}
        alt="poster_hero_section"
        onLoad={handleImageLoad}
        className={`rounded-xl ${isLoading ? "hidden" : "block"}`}
      />
    </div>
  );
};

export default HeroSection;

const ImageSkeleton = () => (
  <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-xl"></div>
);
