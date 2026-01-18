import React, { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

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
  const [gender, setGender] = useState("man"); // default MAN
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      {/* TOP BAR */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-gray-200">
        {/* GENDER SWITCH */}
        <div className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => setGender("woman")}
            className={`pb-1 ${
              gender === "woman" ? "border-b-2 border-black" : ""
            }`}
          >
            WOMAN
          </button>

          <button
            onClick={() => setGender("man")}
            className={`pb-1 ${
              gender === "man" ? "border-b-2 border-black" : ""
            }`}
          >
            MAN
          </button>
        </div>

        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          {/* SALE */}
          <div className="text-red-600 space-y-3">
            <p className="font-medium">Sale</p>
            <p>Up to 50% off</p>
          </div>

          {/* COLLECTION */}
          <div className="md:col-span-2 space-y-3">
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

          {/* ACCOUNT / EXTRA */}
          <div className="space-y-3">
            <h4 className="font-medium mb-2">Account</h4>

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                onClick={onClose}
                className="block hover:underline"
              >
                Dashboard
              </Link>
            )}

            {user && (
              <Link
                to="/cart"
                onClick={onClose}
                className="block hover:underline"
              >
                Cart {cart.length > 0 && `(${cart.length})`}
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="block hover:underline"
                >
                  Signup
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="block text-left hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
