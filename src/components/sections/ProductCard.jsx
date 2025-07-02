import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { formatOriginalPrice, formatPrice } from "@/utils/utils";

// ProductCard component for displaying product grid with configurable columns and interactions
const ProductCard = ({
  products = [],
  title,
  columns = 4,
  className = "",
  onProductClick,
  onAddToCart,
}) => {
  // Grid column configuration for responsive layout
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", // 4 columns on lg (1024px) and above
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5",
  };
  const router = useRouter();
  const navigateToDetailPage = (id) => {
    router.push(`/main/productDetail/${id}`);
  };

  // Main container with optional title section
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <div className="mb-6 flex flex-row justify-between p-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 ">
            {title}
          </h2>
          <Link href={`/main/productCollection/${title}`}>
            <button
              // title="View All "
              className="text-xl sm:text-2xl font-mono text-gray-800 mb-2 hover:underline cursor-pointer"
            >
              View All
            </button>
          </Link>
        </div>
      )}

      {/* Product grid container with responsive columns */}
      <div
        className={`grid ${gridCols[columns]} gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px] mx-auto`}
      >
        {products.map((product, index) => (
          // Individual product card with hover effects
          <div
            key={product?.id || index}
            className="bg-white rounded-lg  transition-all duration-300 cursor-pointer group w-full"
            onClick={() => onProductClick?.(product)}
          >
            {/* Product image container with aspect ratio */}
            <div
              onClick={() => navigateToDetailPage(product?.id || index)}
              className="relative overflow-hidden rounded-t-lg aspect-[3/4] md:aspect-[4/5]"
            >
              <Image
                src={product?.image || product?.images[0]}
                alt={product?.title || "Product image"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority={index < 4} // Prioritize first 4 images for faster loading
              />

              {/* Optional badge display */}
              {product?.badge && (
                <div className="absolute bottom-3 left-6 bg-white text-black text-xs px-2 py-1 rounded font-medium">
                  {product?.badge}
                </div>
              )}

              {/* Quick add overlay on hover */}
              <div className="absolute inset-0  group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.(product);
                  }}
                  className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  Quick Add
                </button> */}
              </div>
            </div>

            {/* product details */}
            <div className="p-3 sm:p-4 flex flex-col gap-0 items-center">
              {/* Product Title */}
              <h3 className="font-medium text-gray-800 text-sm md:text-base mb-1 line-clamp-2">
                {product?.title}
              </h3>

              {/* Star Ratings */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.955L10 0l2.952 5.955 6.561.955-4.757 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Price Section */}
              {product?.price && typeof product.price === "object" ? (
                Object.entries(product.price).map(
                  ([label, price], idx, arr) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-black font-bold text-sm md:text-base">
                        {label}: {formatPrice(price)}
                      </span>

                      {/* Show original price if it exists */}
                      {product.originalPrice?.[label] && (
                        <span className="text-gray-500 line-through text-xs">
                          {label}:{" "}
                          {formatOriginalPrice(product.originalPrice[label])}
                        </span>
                      )}
                    </div>
                  )
                )
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-black font-bold text-sm md:text-base">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-gray-500 line-through text-xs">
                      {formatOriginalPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
