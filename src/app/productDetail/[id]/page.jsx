"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import LoadingOverlay from "@/components/LoadingOverlay";
import Link from "next/link";
import { ProductsContext } from "@/components/context/product-provider";
import { formatOriginalPrice, formatPrice } from "@/utils/utils";

const ProductDetailPage = () => {
  const { particulatProduct, setSelectedItem } = useContext(ProductsContext);

  const param = useParams();
  const id = param.id;
  console.log("🚀 ~ ProductDetailPage ~ id:", id);

  const [product, setProduct] = useState(null);
  console.log("🚀 ~ ProductDetailPage ~ product:", product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPiece, setSelectedPiece] = useState("2-piece");
  const [sortBy, setSortBy] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [openSections, setOpenSections] = useState({
    details: true,
    exchange1: false,
    exchange2: false,
    exchange3: false,
  });

  // Function to extract price value from price string
  const extractPriceValue = (priceString) => {
    if (!priceString) return 0;
    if (typeof priceString === "number") return priceString;

    const patterns = [
      /PKR\s*([\d,]+)/,
      /Rs\.?\s*([\d,]+)/,
      /([\d,]+)\s*PKR/,
      /^\s*([\d,]+)\s*$/,
    ];

    for (const pattern of patterns) {
      const match = priceString.toString().match(pattern);
      if (match) {
        const price = parseInt(match[1].replace(/,/g, ""));
        console.log("🔍 Extracted price:", price, "from:", priceString);
        return price;
      }
    }

    console.warn("⚠️ Could not extract price from:", priceString);
    return 0;
  };

  // Function to calculate price based on selected piece
  const calculatePrice = () => {
    if (!product) return 0;

    console.log("🔍 Product price structure:", product.price);
    console.log("🔍 Selected piece:", selectedPiece);

    // 🔥 UPDATED: Handle object-based pricing (multiple pieces)
    if (product?.price && typeof product?.price === "object") {
      const priceKey = selectedPiece.replace("-", "_");
      console.log("🔍 Price key:", priceKey);
      console.log("🔍 Price value for key:", product.price[priceKey]);

      const extractedPrice = extractPriceValue(product.price[priceKey]);
      console.log("🔍 Extracted price:", extractedPrice);
      return extractedPrice;
    }

    // 🔥 UPDATED: Handle simple string/number pricing
    if (product?.price) {
      const basePrice = extractPriceValue(product.price);
      console.log("🚀 ~ calculatePrice ~ basePrice:", basePrice);

      // Only add piece price if product actually has piece options
      if (hasPieceOptions()) {
        return selectedPiece === "3-piece" ? basePrice + 500 : basePrice;
      }

      // Return base price for single-piece products
      return basePrice;
    }

    console.warn("⚠️ No price found in product");
    return 0;
  };

  const calculateOriginalPrice = () => {
    if (!product) return 0;

    // 🔥 UPDATED: Handle object-based original pricing
    if (product.originalPrice && typeof product.originalPrice === "object") {
      const priceKey = selectedPiece.replace("-", "_");
      return extractPriceValue(product.originalPrice[priceKey]);
    }

    // 🔥 UPDATED: Handle simple string/number original pricing
    if (product.originalPrice) {
      const baseOriginalPrice = extractPriceValue(product.originalPrice);

      // Only add piece price if product actually has piece options
      if (hasPieceOptions()) {
        return selectedPiece === "3-piece"
          ? baseOriginalPrice + 700
          : baseOriginalPrice;
      }

      // Return base original price for single-piece products
      return baseOriginalPrice;
    }

    console.warn("⚠️ No original price found in product");
    return 0;
  };

  // Function to check if product has both 2-piece and 3-piece options
  const hasPieceOptions = () => {
    if (!product) return false;

    // 🔥 UPDATED: Check for object-based piece pricing
    if (product.price && typeof product.price === "object") {
      return product.price["2_piece"] && product.price["3_piece"];
    }

    // 🔥 NEW: For simple pricing, no piece options by default
    return false;
  };

  // 🔥 NEW: Centralized function to update context with current state
  const updateContextState = (
    newQuantity = quantity,
    newSize = selectedSize,
    newPiece = selectedPiece
  ) => {
    if (!product) return;

    const calculatedPrice = calculatePrice();
    const finalPrice = isNaN(calculatedPrice) ? 0 : calculatedPrice;
    const totalPrice = finalPrice * newQuantity;

    console.log("🔍 Updating context with:", {
      quantity: newQuantity,
      size: newSize,
      piece: newPiece,
      unitPrice: finalPrice,
      totalPrice: totalPrice,
    });

    setSelectedItem({
      image: product?.images?.[selectedImage] || "",
      itemTitle: product?.title || "",
      totalQuantity: newQuantity.toString(),
      totalPrices: totalPrice.toLocaleString(),
      itemSize: newSize || "XS",
      itemId: product?.id?.toString() || "",
      selectedPiece: newPiece, // 🔥 NEW: Added piece info to context
      unitPrice: finalPrice.toLocaleString(), // 🔥 NEW: Added unit price for reference
    });
  };

  // 🔥 UPDATED: Simplified quantity functions that use centralized update
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateContextState(newQuantity); // 🔥 NEW: Use centralized update
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateContextState(newQuantity); // 🔥 NEW: Use centralized update
  };

  // 🔥 NEW: Effect to update context whenever relevant state changes
  useEffect(() => {
    if (product && selectedSize) {
      updateContextState();
    }
  }, [selectedPiece, selectedImage]); // 🔥 NEW: Auto-update when piece or image changes

  useEffect(() => {
    const getProduct = () => {
      try {
        setLoading(true);
        const demoPruduct = particulatProduct(parseInt(id));

        if (!demoPruduct) {
          console.warn("Product not found for ID:", id);
        }
        setProduct(demoPruduct);
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ getProduct ~ error:", error);
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id, particulatProduct]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
        <div className="hidden lg:flex flex-col w-24 p-4 space-y-3">
          {product?.images?.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`aspect-[3/4] rounded-lg overflow-hidden border-2 relative ${
                selectedImage === idx ? "border-black" : "border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`Product ${idx + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 lg:pl-2">
          <div className="aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden shadow-sm relative">
            <Image
              src={product?.images?.[selectedImage] || "/placeholder.jpg"}
              alt={product?.title || "Product image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

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
    // 🔥 NEW: Calculate real-time price for checkout display
    const currentPrice = calculatePrice();
    const totalPrice = isNaN(currentPrice) ? 0 : currentPrice * quantity;

    return (
      <>
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          ></div>
        )}

        <div
          className={`fixed inset-y-0 right-0 transform ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="h-full flex flex-col ">
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

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-5 mb-6">
                <div className="w-30 h-36 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={
                      product?.images?.[selectedImage] || product?.images?.[0]
                    }
                    alt={product?.title || "Product"}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {product?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Size: {selectedSize || "XS"}
                  </p>
                  {hasPieceOptions() && (
                    <p className="text-sm text-gray-600 mb-2">
                      {selectedPiece}
                    </p>
                  )}
                  {/* 🔥 UPDATED: Real-time price display */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      Unit Price: {currentPrice.toLocaleString()}
                    </p>
                    <p className="font-semibold text-gray-900">
                      Total: PKR {totalPrice.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 border border-gray-300 w-24 mb-6">
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

              <p className="text-sm text-gray-600 mb-3">
                Shipping & taxes calculated at checkout
              </p>

              <Link href={`/billingInfo/${product?.id}`}>
                <button className="w-full bg-black text-white py-3 hover:bg-gray-800 font-medium">
                  CHECKOUT - PKR{" "}
                  {isNaN(totalPrice) ? "0" : totalPrice.toLocaleString()}
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
            <span className="text-xl font-semibold">
              PKR {calculatePrice().toLocaleString()}
            </span>
            <span className="text-base text-gray-500 line-through">
              PKR {calculateOriginalPrice().toLocaleString()}
            </span>
          </div>
        </div>

        {hasPieceOptions() && (
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <span className="text-sm font-medium">Select Pieces</span>
            </div>
            <div className="flex gap-3">
              {["2-piece", "3-piece"].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPiece(item);
                    // 🔥 UPDATED: Use centralized update function
                    updateContextState(quantity, selectedSize, item);
                  }}
                  className={`flex-1 py-3 px-4 border rounded-lg text-sm font-medium transition-colors ${
                    selectedPiece === item
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-sm font-medium">Size</span>
            <button className="text-xs text-gray-500 underline hover:text-black cursor-pointer">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product?.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  // 🔥 UPDATED: Use centralized update function
                  updateContextState(quantity, size, selectedPiece);
                }}
                className={`w-12 h-12 border rounded-lg text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            // 🔥 UPDATED: Simplified - context is already updated, just open sidebar
            updateContextState(); // Ensure latest state is in context
            setSidebarOpen(true);
          }}
          className="w-full bg-black text-white py-4 hover:bg-gray-800 mb-8 transition-colors"
        >
          ADD TO BAG
        </button>

        <div className="border-t border-gray-200">
          {["details", "exchange1", "exchange2", "exchange3"].map((section) => (
            <div key={section} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex justify-between py-5 hover:bg-gray-50 transition-colors"
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
        {topHeader()}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
          <ImageGallery />
          <ProductInfo />
        </div>
        {productCheckOut()}
      </div>
    </>
  );
};

export default ProductDetailPage;
