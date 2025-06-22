"use client";
import React, { useContext } from "react";
import ProductCard from "./sections/ProductCard";
import { ProductsContext } from "./context/product-provider";
import Link from "next/link";

const HeroSection = () => {
  // const sampleProducts = [
  //   {
  //     id: 1,
  //     image:
  //       "https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-6-2023-12-13_13_08_30.jpeg",
  //     title: "Floral White Dress",
  //     price: "1,500",
  //     badge: "BEST SELLER",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-0-2023-12-13_13_08_30.jpeg",
  //     title: "Black Geometric Suit",
  //     price: "2,307.00",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-1-2023-12-13_13_08_30.jpeg",
  //     title: "Yellow White Suit",
  //     price: "1,500",
  //     badge: "HOT",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-8-2023-12-13_13_08_30.jpeg",
  //     title: "Elegant White Dress",
  //     price: "1,500",
  //     badge: "BEST SELLER",
  //   },
  // ];
  // Importing the ProductsContext to access product data
  // This context should be provided higher in the component tree
  const { productData } = useContext(ProductsContext);
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
        // products={sampleProducts}
        title="NEW ARRIVALS"
        columns={4}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />
      {/* --------------------------- */}
      {/* <Link href={`/productCollection/${title}`}> */}
      <button className="bg-black text-white w-full max-w-[267px] max-h-[68px] p-[10px] text-xs tracking-wide uppercase font-medium hover:bg-gray-900 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out mx-auto mb-3 mt-5">
        Explore All Items
      </button>
      {/* </Link> */}
      {/* --------------------------- */}
      <ProductCard
        products={productData}
        // products={sampleProducts}
        title="BEST SELLER"
        columns={4}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default HeroSection;
