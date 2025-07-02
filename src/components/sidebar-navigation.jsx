"use client";
import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchValue, setSearchValue } from "@/lib/features/productSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Register from "./auth/Register";

const SidebarNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.product);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  const menuItems = [
    { title: "HOME", route: "/" },
    { title: "BEST SELLERS", route: "#" },

    { title: "SHOP ALL", route: "#" },

    { title: "SALES", route: "#" },

    { title: "TRACKING", route: "#" },
  ];
  const popularSearches = ["T-Shirts", "Hoodies", "Jeans"];

  // Handle popular search click
  const handlePopularSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    setSearchOpen(false);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      setSearchOpen(false);
    }
  };

  // Handle close button click - clear search and close
  const handleCloseSearch = () => {
    dispatch(clearSearchValue());
    setSearchOpen(false);
  };

  // Handle outside click - only close, don't clear
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setSearchOpen(false);
    }
  };

  const handleNavigate = () => {
    router.push("/auth/register");
  };

  const SearchOverlay = () => {
    return (
      <>
        {searchOpen && (
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-none z-50 flex items-start justify-center px-4 pt-20 transition-all duration-300"
            onClick={handleOutsideClick}
          >
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 animate-in slide-in-from-top-4">
              {/* Search Input Section */}
              <form onSubmit={handleSearchSubmit} className="p-6">
                <div className="relative">
                  <input
                    onChange={(e) => dispatch(setSearchValue(e.target.value))}
                    value={searchValue}
                    type="text"
                    placeholder="Search products, brands, categories..."
                    className="w-full px-6 py-4 pl-14 pr-16 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 text-gray-700 placeholder-gray-400 text-lg shadow-sm bg-white transition-all duration-200"
                    autoFocus
                  />

                  {/* Search Icon inside input */}
                  <IoIosSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
                  >
                    <IoMdClose className="h-6 w-6" />
                  </button>
                </div>
              </form>

              {/* Popular Searches */}
              <div className="px-6 pb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                  Popular Searches
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {popularSearches.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearch(item)}
                      className="flex items-center gap-3 px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center group-hover:from-black group-hover:to-gray-800 transition-all duration-200">
                        <IoIosSearch className="h-4 w-4 text-gray-600 group-hover:text-white" />
                      </div>
                      <span className="font-medium text-sm">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  const Sidebar = (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="relative p-6 h-full">
          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 left-4 text-black hover:text-gray-700"
          >
            <IoMdClose className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </button>

          {/* Navigation Items */}
          <nav className="mt-12">
            <ul className="space-y-4">
              {menuItems.map(({ title, route }, index) => (
                <li key={index}>
                  <Link
                    href={route}
                    onClick={() => setSidebarOpen(false)}
                    className="block text-black font-normal leading-[100%] tracking-wider uppercase text-[20px] border-b border-gray-200 pb-2 transition-colors duration-300  hover:bg-black/20"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
  const headerSection = (
    <>
      <header className="bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Hamburger Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <RxHamburgerMenu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col items-center">
                <img
                  src="/header/header-logo.svg"
                  alt="Modique Apparel Logo"
                  className="h-15 w-40 object-contain"
                />
              </div>
            </div>

            {/* Right - Search, Cart, User */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-800 hover:bg-gray-100 p-2 rounded-full"
              >
                <IoIosSearch className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
              <button className="text-gray-800 hover:bg-gray-100 p-2 rounded-full">
                <HiOutlineShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </button>
              <button
                onClick={handleNavigate}
                className="text-gray-800 hover:bg-gray-100 p-2 rounded-full"
              >
                <HiMiniUser className="h-5 w-5" />
                <span className="sr-only">User Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );

  return (
    <>
      {/* Header */}
      {headerSection}
      {/* --------------- */}
      {/* Search Overlay */}
      <SearchOverlay />
      {/* ---------------- */}

      {/* Sidebar section */}
      {Sidebar}
      {/* -------------- */}

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}
      {/* ------------------------ */}
      {loginClicked && <Register />}
    </>
  );
};

export default SidebarNavigation;
