import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const PurchaseCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />

        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-gray-600">
          No worries — your payment was not completed. You can try again anytime.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/cart"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Back to Cart
          </Link>

          <Link
            to="/"
            className="w-full border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <p className="mt-5 text-xs text-gray-400">
          If you keep having issues, try a different card or check your payment
          details.
        </p>
      </div>
    </div>
  );
};

export default PurchaseCancelled;
