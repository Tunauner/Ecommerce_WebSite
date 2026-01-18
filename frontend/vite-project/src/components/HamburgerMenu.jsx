import React, { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { label: "Tops", slug: "tops" },
  { label: "Jeans", slug: "jeans" },
  { label: "Pants", slug: "pants" },
  { label: "Jackets & Coats", slug: "jackets" },
  { label: "Sweatshirts", slug: "sweatshirts" },
  { label: "Shirts", slug: "shirts" },
  { label: "Shoes", slug: "shoes" },
  { label: "Bags & Accessories", slug: "bags" },
];

const HamburgerMenu = ({ isOpen, onClose }) => {
  const [gender, setGender] = useState("man"); //  default MAN

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      {/* TOP BAR */}
      <div className="h-20 px-8 flex items-center justify-between border-b border-gray-200">
        {/* GENDER SWITCH */}
        <div className="flex gap-8 text-sm font-medium">
          <button
            onMouseEnter={() => setGender("woman")}
            className={`${
              gender === "woman" ? "border-b-2 border-black" : ""
            } pb-1`}
          >
            WOMAN
          </button>

          <button
            onMouseEnter={() => setGender("man")}
            className={`${
              gender === "man" ? "border-b-2 border-black" : ""
            } pb-1`}
          >
            MAN
          </button>
        </div>

        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-12 py-14" onMouseLeave={onClose}>
        <div className="grid grid-cols-4 gap-16 text-sm">
          {/* SALE */}
          <div className="text-red-600 space-y-3">
            <p>Sale</p>
            <p>Up to 50% off</p>
          </div>

          {/* COLLECTION */}
          <div className="col-span-2 space-y-3">
            <h4 className="font-medium mb-2">Collection</h4>

            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/${gender}/category/${cat.slug}`}
                onClick={onClose}
                className="block hover:underline"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* INSPIRATION */}
          <div className="space-y-3">
            <h4 className="font-medium">Inspiration</h4>
            <p>Licensed</p>
            <p>STWD</p>
            <p>Often</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
