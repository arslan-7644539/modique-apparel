"use client";
import { useState } from "react";

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [activeOptions, setActiveOptions] = useState({}); // Track active option per filter

  const filtersData = [
    {
      title: "In Stock & Out of Stock Filter",
      options: ["In Stock", "Out Stock"],
    },
    {
      title: "Product Category",
      options: [
        "Dresses (325)",
        "Accessories (3)",
        "Co-ords / Two Piece (128)",
      ],
    },
    {
      title: "Price Range",
      price: true,
    },
  ];

  const handleOptionClick = (filterTitle, option) => {
    setActiveOptions((prev) => ({
      ...prev,
      [filterTitle]: option,
    }));
  };

  return (
    <div className="w-64 bg-white p-6 space-y-6">
      {filtersData.map((filter, index) => (
        <div key={index} className="space-y-3">
          <h3 className="font-medium text-sm text-gray-900">{filter.title}</h3>

          {filter.price ? (
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Number.parseInt(e.target.value),
                  ])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filter.options.map((option, optIndex) => {
                const isActive = activeOptions[filter.title] === option;

                return (
                  <div
                    key={optIndex}
                    onClick={() => handleOptionClick(filter.title, option)}
                    className={`flex items-center space-x-2 cursor-pointer 
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-100"
                        } p-2 rounded`}
                  >
                    <label className="text-sm cursor-pointer">{option}</label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
