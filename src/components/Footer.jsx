"use client";

import { useState } from "react";

export default function ModiqueFooter() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      console.log("Newsletter subscription:", email);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-white border-t border-gray-200 px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="text-sm text-gray-600 leading-relaxed space-y-4">
              <p>
                Modique Apparels is your go-to online destination for stylish
                and modest Western attire, catering to the global fashion needs
                of women. Our collection features trendy, summery, and exquisite
                dresses that are sure to elevate your wardrobe.
              </p>
              <p>
                For any general queries, feel free to reach out to us via
                Instagram DM at @modique. If you need assistance with exchanges,
                tracking, or bank transfers, please email us at dummy@gmail.com
              </p>
            </div>
          </div>

          {/* Categories and Links - Mobile: Row, Desktop: Separate Columns */}
          <div className="md:hidden flex justify-between gap-4">
            {/* Hot Categories - Left Side */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base mb-4">
                Hot Categories
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Western
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Western
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Western
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Western
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Western
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links - Right Side */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Return Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Hot Categories - Desktop Only */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-900 text-base mb-4">
              Hot Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Western
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Western
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Western
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Western
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Western
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links - Desktop Only */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-900 text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 text-base mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Subscribe to receive early access to our exclusive new
              collections, be the first to know about any upcoming discounts and
              stay updated.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border border-gray-300 px-3 py-2.5 text-sm rounded-none outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-sm py-2.5 transition-colors duration-200"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Mobile About Section */}
        <div className="md:hidden mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              Modique Apparels is your go-to online destination for stylish and
              modest Western attire, catering to the global fashion needs of
              women.
            </p>
            <p>
              For queries, reach out via Instagram @modique or email
              dummy@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Modique Apparels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
