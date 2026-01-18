import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { FcCheckmark } from "react-icons/fc";

const CouponComponent = () => {
  const [userInput, setUserInput] = useState("");
  const { applyCoupon, removeCoupon, getCoupon, isCouponApplied, coupon } =
    useCartStore();

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);

  const handleApplyCoupon = () => {
    if (!userInput) return;
    applyCoupon(userInput);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setUserInput("");
  };

  return (
    <div className="border border-gray-200 p-6 max-w-md w-full">
      <h2 className="text-sm font-medium text-gray-900 mb-4">
        Do you have a coupon code?
      </h2>

      {/* INPUT */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Coupon code"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
        />

        <button
          onClick={handleApplyCoupon}
          className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition"
        >
          Apply
        </button>
      </div>

      {/* AVAILABLE COUPON */}
      {!isCouponApplied && (
        <div className="text-xs text-gray-500 mb-4">
          {coupon ? (
            <span>
              Available coupon:{" "}
              <span className="text-gray-900 font-medium">
                {coupon.code} ({coupon.discountPercentage}%)
              </span>
            </span>
          ) : (
            <span>No coupons available</span>
          )}
        </div>
      )}

      {/* APPLIED */}
      {isCouponApplied && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <FcCheckmark className="w-5 h-5" />
            Coupon applied
          </div>

          <button
            onClick={handleRemoveCoupon}
            className="text-xs text-gray-500 hover:text-red-600 transition w-fit"
          >
            Remove coupon
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponComponent;
