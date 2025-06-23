"use client";
import { productData } from "@/utils/product-list";
import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  // --------------------------------------------------
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    image: "",
    itemTitle: "",
    totalQuantity: "",
    totalPrices: "",
    itemSize: "",
    itemId: "",
  });

  console.log("🚀 ~ ProductsProvider ~ selectedItem:", selectedItem);

  // ✅ NEW: Load selectedItem from sessionStorage on app start
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedData = sessionStorage.getItem("checkoutData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("🔄 Loading stored data in context:", parsedData);
          setSelectedItem(parsedData);
        }
      } catch (error) {
        console.error("Error loading stored data:", error);
        sessionStorage.removeItem("checkoutData");
      }
    };

    loadStoredData();
  }, []);

  // --------------------------------------------------
  const filterProduct = productData?.filter((item) =>
    item?.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const particulatProduct = (productId) => {
    const product = productData.find((item) => item.id === productId);
    if (product) {
      return product;
    } else {
      console.error("Product not found");
      return null;
    }
  };

  // ✅ NEW: Enhanced function to set selectedItem with proper ID
  const setSelectedItemWithId = (itemData, productId) => {
    const updatedItem = {
      ...itemData,
      itemId: productId.toString(), // Ensure itemId is string for consistency
    };

    console.log("💾 Setting selectedItem with ID:", updatedItem);
    setSelectedItem(updatedItem);

    // ✅ Also save to sessionStorage immediately
    try {
      sessionStorage.setItem("checkoutData", JSON.stringify(updatedItem));
      console.log("✅ Saved to sessionStorage");
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  };

  // ✅ NEW: Function to clear selectedItem and storage
  const clearSelectedItem = () => {
    console.log("🧹 Clearing selectedItem and storage");
    setSelectedItem({
      image: "",
      itemTitle: "",
      totalQuantity: "",
      totalPrices: "",
      itemSize: "",
      itemId: "",
    });
    sessionStorage.removeItem("checkoutData");
  };

  return (
    <ProductsContext.Provider
      value={{
        // row Product Data
        productData,
        // particular data by id
        particulatProduct,
        // filter product using with search bar
        filterProduct,
        // state for search bar
        searchValue,
        setSearchValue,
        // state for final selected item by user's
        selectedItem,
        setSelectedItem,
        // ✅ NEW: Enhanced setter with ID and storage
        setSelectedItemWithId,
        // ✅ NEW: Clear function
        clearSelectedItem,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
