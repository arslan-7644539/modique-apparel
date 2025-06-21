"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import Link from "next/link";

const ProductDetailPage = () => {
  // ✅ Get product ID from URL
  const param = useParams();
  const id = param.id;
  console.log("🚀 ~ ProductDetailPage ~ id:", id);

  const [product, setProduct] = useState(null); // Single product, not array
  console.log("🚀 ~ ProductDetailPage ~ product:", product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Move these hooks to component level
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [openSections, setOpenSections] = useState({
    details: true,
    exchange1: false,
    exchange2: false,
    exchange3: false,
  });

  // ✅ Fetch product data from JSON server (only first product for details page)
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/products");
        console.log("🚀 ~ fetchProduct ~ response:", response);
        setProduct(response.data[0]); // Set only the first product
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // ✅ Move quantity functions to component level
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Best Rating" },
  ];

  const topHeader = () => {
    return (
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div></div>
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 bg-white rounded hover:bg-gray-50 focus:outline-none"
          >
            <span>Sort: {sortBy}</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.label);
                    setShowSortDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ImageGallery = () => {
    return (
      <div className="lg:w-1/2 flex flex-col lg:flex-row">
        {/* Thumbnail Images */}
        <div className="hidden lg:flex flex-col w-24 p-4 space-y-3">
          {product?.images?.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`aspect-[3/4] rounded-lg overflow-hidden border-2 ${
                selectedImage === idx ? "border-black" : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 p-4 lg:pl-2">
          <div className="aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden shadow-sm">
            <img
              src={product?.images[selectedImage]} // ✅ Show selected image
              alt={product?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Dots Navigation */}
          <div className="flex lg:hidden justify-center mt-6 space-x-2">
            {product?.images?.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-3 h-3 rounded-full ${
                  selectedImage === idx ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const productCheckOut = () => {
    return (
      <>
        {/* Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          ></div>
        )}

        {/* Cart Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 transform ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="h-full flex flex-col ">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Cart</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 font-medium hover:text-gray-600 "
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Product Item */}
              <div className="flex flex-col gap-5 mb-6">
                {/* Product Image */}
                <div className="w-30 h-36 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={product?.images?.[0]}
                    alt={product?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {product?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedSize || "XS"}
                  </p>
                  <p className="font-semibold text-gray-900 mb-3">
                    {product?.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 border border-gray-300  w-24 mb-6">
                    <button
                      onClick={decreaseQuantity}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span className="text-center min-w-[1.5rem] text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <p className="text-sm text-gray-600 mb-3">
                Shipping & taxes calculated at checkout
              </p>

              {/* Checkout Button */}
              <Link href={`/billingInfo/${product?.id}`}>
                <button className="w-full bg-black text-white py-3  hover:bg-gray-800 font-medium">
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ProductInfo = () => {
    return (
      <div className="lg:w-1/2 p-4 lg:p-8 lg:pl-6">
        <div className="mb-8">
          <h1 className="text-xl lg:text-2xl font-medium text-gray-900 mb-3">
            {product?.title}
          </h1>
          <div className="flex items-center space-x-3">
            <span className="text-xl font-semibold">{product?.price}</span>
            <span className="text-base text-gray-500 line-through">
              {product?.originalPrice}
            </span>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-sm font-medium">Size</span>
            <button className="text-xs text-gray-500 underline hover:text-black">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product?.sizes?.map((size) => (
              <button
                key={size} // ✅ Now unique key for sizes
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border rounded-lg text-sm font-medium ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="w-full bg-black text-white py-4  hover:bg-gray-800 mb-8"
        >
          ADD TO BAG
        </button>

        {/* Accordion Sections */}
        <div className="border-t border-gray-200">
          {["details", "exchange1", "exchange2", "exchange3"].map((section) => (
            <div key={section} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex justify-between py-5 hover:bg-gray-50"
              >
                <span className="font-medium text-sm capitalize">
                  {section}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSections[section] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections[section] && (
                <div className="pb-5 text-sm text-gray-600">
                  {section === "details" && (
                    <>
                      <p className="mb-3">{product?.description}</p>
                      <p>
                        <span className="font-medium">Fabric:</span>{" "}
                        {product?.fabric}
                      </p>
                    </>
                  )}
                  {section === "exchange1" && (
                    <p>Exchange within 7 days. Contact customer service.</p>
                  )}
                  {section === "exchange2" && (
                    <p>Free shipping on orders over PKR 2,000.</p>
                  )}
                  {section === "exchange3" && (
                    <p>30 days easy return with original packaging.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <LoadingOverlay isLoading={loading} status="Loading..." />
      <div className="min-h-auto bg-white">
        {/* Sort Header */}
        {topHeader()}
        {/* ---------------------- */}

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
          {/* Image Gallery */}
          <ImageGallery />
          {/* --------------------- */}

          {/* Product Info */}
          <ProductInfo />
          {/* --------------------- */}
        </div>

        {/* Product Checkout Sidebar */}
        {productCheckOut()}
      </div>
    </>
  );
};

export default ProductDetailPage;
