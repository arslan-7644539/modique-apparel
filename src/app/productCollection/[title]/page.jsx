"use client";
import ProductCard from "@/components/sections/ProductCard";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import { ProductsContext } from "@/components/context/product-provider";

const ProductListingPage = () => {
  // Importing the ProductsContext to access product data
  const { productData, filterProduct } = useContext(ProductsContext);
  // Extracting the title from the URL parameters
  const params = useParams();
  const rawTitle = params.title;
  const title = rawTitle && decodeURIComponent(rawTitle);

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [stockFilter, setStockFilter] = useState({
    inStock: true,
    outOfStock: false,
  });

  // Sample products data
  // const sampleProducts = [
  //   {
  //     id: 4,
  //     image:
  //       "https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-8-2023-12-13_13_08_30.jpeg",
  //     title: "Elegant White Dress",
  //     price: "1,500",
  //     badge: "BEST SELLER",
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-6-2023-12-13_13_08_30.jpeg",
  //     title: "Floral White Dress",
  //     price: "1,500",
  //     badge: "BEST SELLER",
  //   },
  //   {
  //     id: 6,
  //     image:
  //       "https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-0-2023-12-13_13_08_30.jpeg",
  //     title: "Black Geometric Suit",
  //     price: "2,307.00",
  //   },
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
  // ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Best Rating" },
  ];

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
  };

  return (
    <div className="min-h-auto bg-white">
      {/* Header */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
          {/* title */}
          <div className="flex-grow text-center">
            <h1 className="font-semibold text-xl text-black">
              MOST-LOVED | {title?.toUpperCase()}
            </h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 bg-white  rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              <span>Sort : {sortBy} </span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-y-auto">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Product Grid */}
        <div className="flex-1 p-6">
          <ProductCard
            products={filterProduct}
            // products={productData}
            columns={3}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
