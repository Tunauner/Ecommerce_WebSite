import CartItems from "../components/CartItems";
import { useCartStore } from "../stores/useCartStore";
import { useEffect } from "react";
import OrderSummary from "../components/OrderSummary";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import RecomendedProducts from "../components/RecomendedProducts";
import CouponComponent from "../components/CouponComponent";

const CartPage = () => {
  const {
    cart,
    getCartItems,
    subTotal,
    total,
    getRecommendedProducts,
    recomendedProducts,
    coupon,
  } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  useEffect(() => {
    getRecommendedProducts();
  }, [getRecommendedProducts]);

  return (
    <div className="container mx-auto px-4 py-6">
      {cart?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-3 flex flex-col space-y-4 order-1">
            {cart.map((product) => (
              <CartItems
                key={`${product._id}-${product.size || "nosize"}`}
                product={product}
              />
            ))}
          </div>

          {/* ORDER SUMMARY  */}
          <div className="lg:col-span-1 flex flex-col space-y-6 order-2">
            <OrderSummary total={total} subTotal={subTotal} />
            <CouponComponent coupon={coupon} />
          </div>

          {/* RECOMMENDED  */}
          <div className="lg:col-span-3 order-3">
            <RecomendedProducts recomendedProducts={recomendedProducts} />
          </div>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-6 text-center px-4">
            <ShoppingBag className="w-12 h-12 text-slate-500" />
            <p className="text-slate-600">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/"
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
