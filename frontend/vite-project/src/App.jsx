import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect} from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCartStore } from "./stores/useCartStore";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelled from "./pages/PurchaseCancelled";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const location = useLocation();

  useEffect(() => {
    //her renderde auth kontrol et ve user bilgilerini güncelle
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) {
    // auth kontrol edene kadar sayfada loading spinner göster
    return <LoadingSpinner />;
  }

  // const hideNavbar = location.pathname === "/";
  //<div className={hideNavbar ? "" : "pt-24"}>
  //     {!hideNavbar && <Navbar />}

   

  // footer'ın görünmesini istemediğim sayfalar
  const hideFooterRoutes = ["/secret-dashboard"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="pt-24">
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:gender" element={<CategoryPage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/secret-dashboard"
          element={
            user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/:gender/category/:category" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-success"
          element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-cancel"
          element={user ? <PurchaseCancelled /> : <Navigate to="/login" />}
        />
      </Routes>
      {!shouldHideFooter && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
