import { productData } from "@/utils/product-list";
import { createSlice } from "@reduxjs/toolkit";

const initialSelectedItem = {
  image: "",
  itemTitle: "",
  totalQuantity: "",
  totalPrices: "",
  itemSize: "",
  itemId: "",
};

const initialState = {
  originalProductData: productData, // Store original data
  productData: productData, // Filtered data for display
  setSelectedItem: initialSelectedItem,
  searchValue: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductItem: (state, action) => {
      state.setSelectedItem = {
        ...state.setSelectedItem,
        ...action.payload,
      };
    },

    clearSelectedItem: (state) => {
      state.setSelectedItem = initialSelectedItem;
    },

    updateSelectedQuantity: (state, action) => {
      if (state.setSelectedItem.itemId) {
        state.setSelectedItem.totalQuantity = action.payload.quantity;
        state.setSelectedItem.totalPrices = action.payload.totalPrice;
      }
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;

      // Improved search logic
      const searchTerm = action.payload.trim().toLowerCase();

      if (searchTerm === "") {
        // Reset to original data when search is empty
        state.productData = state.originalProductData;
      } else {
        // Filter products based on search term
        state.productData = state.originalProductData.filter((item) => {
          // Search in multiple fields for better results
          const titleMatch = item.title?.toLowerCase().includes(searchTerm);
          const categoryMatch = item.category
            ?.toLowerCase()
            .includes(searchTerm);
          const descriptionMatch = item.description
            ?.toLowerCase()
            .includes(searchTerm);

          return titleMatch || categoryMatch || descriptionMatch;
        });
      }
    },

    clearSearchValue: (state) => {
      state.searchValue = "";
      // Reset to original data when clearing search
      state.productData = state.originalProductData;
    },

    // Additional utility action to reset product data
    // resetProductData: (state) => {
    //   state.productData = state.originalProductData;
    // },
  },
});

export const {
  setProductItem,
  clearSelectedItem,
  updateSelectedQuantity,
  setSearchValue,
  clearSearchValue,
  // resetProductData,
} = productSlice.actions;

export default productSlice.reducer;
