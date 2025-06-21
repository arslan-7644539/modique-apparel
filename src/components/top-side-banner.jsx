"use client";
import React from "react";
import BannerSection from "./sections/BannerSection";

const TopBanner = () => {
  const bannerData = [
    {
      bgImage:
        "https://img.drz.lazcdn.com/static/pk/p/11273d5a77afda2636ead0bf0f5d3687.jpg_2200x2200q80.jpg_.webp",
      //   bgImage: "/bannerSection/demo1.jpg",
      title: "BEST SELLER",
      buttonText: "EXPLORE ALL ITEMS",
      onButtonClick: () => console.log("Best Seller clicked!"),
    },
    {
      bgImage:
        "https://maajisafashion.com//images/product/2025/06/ibiza-historic-fancy-muslin-ladies-suit-catalog-2025-06-18_16_41_57.jpeg",
      //   bgImage: "/bannerSection/demo2.jpg",
      title: "NEW ARRIVALS",
      buttonText: "SHOP NOW",
      onButtonClick: () => console.log("New Arrivals clicked!"),
    },
  ];

  return (
    <>
      <div>
        {bannerData?.map((item, index) => (
          <BannerSection
            key={index}
            bgImage={item?.bgImage} // public folder me image rakho
            title={item?.title}
            buttonText={item?.buttonText}
            onButtonClick={() => console.log("Best Seller clicked!")}
          />
        ))}

        {/* ------------------------------ */}
      </div>
    </>
  );
};

export default TopBanner;
