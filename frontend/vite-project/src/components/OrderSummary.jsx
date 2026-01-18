import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";

const OrderSummary = ({ total, subTotal }) => {
  const { cart, coupon, isCouponApplied } = useCartStore();

  const handlePayment = async () => {
    const res = await axios.post("/payment/create-checkout-session", {
      products: cart,
      couponCode: coupon && isCouponApplied ? coupon.code : null,
    });

    window.location.href = res.data.url;
  };

  let saves = 0;
  if (coupon && isCouponApplied) {
    saves = subTotal * (coupon.discountPercentage / 100);
  }

  return (
    <div className="border border-gray-200 p-6 max-w-md w-full">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Original Price</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>

        {coupon && isCouponApplied && (
          <div className="flex justify-between text-gray-700">
            <span>Coupon Discount</span>
            <span className="text-red-600">- ${saves}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 flex justify-between font-medium text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full mt-6 border border-black py-3 text-sm hover:bg-black hover:text-white transition"
      >
        Proceed to Checkout
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-black transition">
          Continue Shopping
        </Link>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};

export default OrderSummary;
