export const formatOriginalPrice = (originalPrice) => {
  if (typeof originalPrice === "string") {
    return originalPrice;
  } else if (typeof originalPrice === "object" && originalPrice !== null) {
    // For original price, show the higher price (3_piece) if available
    if (originalPrice["3_piece"]) {
      return originalPrice["3_piece"];
    } else if (originalPrice["2_piece"]) {
      return originalPrice["2_piece"];
    }
  }
  return null;
};

// Helper function to format price display
export const formatPrice = (price) => {
  if (typeof price === "string") {
    return price;
  } else if (typeof price === "object" && price !== null) {
    // Handle object prices (2_piece, 3_piece)
    if (price["2_piece"] && price["3_piece"]) {
      return `${price["2_piece"]} - ${price["3_piece"]}`;
    } else if (price["2_piece"]) {
      return price["2_piece"];
    } else if (price["3_piece"]) {
      return price["3_piece"];
    }
  }
  return "Price not available";
};

export const generateSlug = (title) => {
  if (!title || typeof title !== "string") return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
