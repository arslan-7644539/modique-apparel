"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProductCard from "./sections/ProductCard";

const HeroSection = () => {
  const productData = useSelector((state) => state.product.productData);
  // console.log("🚀 ~ HeroSection ~ productData:", productData);

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
  };

  return (
    <div className="min-w-[320px] w-full max-w-[1440px] mx-auto h-auto bg-white flex flex-col gap-5 p-4">
      <ProductCard
        products={productData}
        // title="NEW ARRIVALS"
        columns={4}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />
      {/* --------------------------- */}
      <Link
        href={`/main/productCollection/${"NEW ARRIVALS"}`}
        className="block w-full text-center"
      >
        <button className="bg-black text-white w-full max-w-[267px] max-h-[68px] p-[10px] text-xs tracking-wide uppercase font-medium hover:bg-gray-900 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out mx-auto mb-3 mt-5">
          Explore All Items
        </button>
      </Link>
      {/* --------------------------- */}
      {/* <ProductCard
        products={productData}
        title="BEST SELLER"
        columns={4}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      /> */}
    </div>
  );
};

export default HeroSection;
