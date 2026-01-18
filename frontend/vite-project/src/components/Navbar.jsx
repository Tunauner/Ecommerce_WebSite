import React, { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  /*  SCROLL STATE  */
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 120) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkClass =
    "relative text-[15px] font-medium tracking-wide text-gray-900 group";

  const underline =
    "absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full";

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          bg-white border-b border-gray-200
          transition-transform duration-300 ease-in-out
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* FULL WIDTH BAR */}
        <div className="relative w-full px-10 h-20 flex items-center">
          {/* LEFT */}
          <button onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="
    absolute left-1/2 -translate-x-1/2
    text-[15px] sm:text-[16px]
    font-semibold tracking-[0.35em]
    text-black
  "
          >
            T U N A&nbsp;E D I T I O N
          </Link>

          {/* RIGHT */}
          <nav className="ml-auto flex items-center gap-12 pr-6">
            {isAdmin && (
              <Link to="/secret-dashboard" className={linkClass}>
                Dashboard
                <span className={underline} />
              </Link>
            )}

            {user && (
              <Link to="/cart" className={`${linkClass} flex items-center`}>
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] text-[11px] bg-black text-white flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
                <span className={underline} />
              </Link>
            )}

            {user ? (
              <button onClick={logout} className={linkClass}>
                Logout
                <span className={underline} />
              </button>
            ) : (
              <>
                <Link to="/login" className={linkClass}>
                  Login
                  <span className={underline} />
                </Link>
                <Link to="/signup" className={linkClass}>
                  Signup
                  <span className={underline} />
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* HAMBURGER MENU */}
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
