"use client";

import { productData } from "@/utils/product-list";
import { createContext, useState } from "react";

export const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
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

  return (
    <ProductsContext.Provider
      value={{
        productData,
        particulatProduct,
        filterProduct,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
