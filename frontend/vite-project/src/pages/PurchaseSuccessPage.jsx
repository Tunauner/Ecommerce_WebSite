import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const PurchaseSuccess = () => {
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        setLoading(true);
        await axios.post("/payment/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    console.log("Sessıon Id: ",sessionId);
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setLoading(false);
      console.log(" sessionId not found");
    }
  }, [clearCart]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Payment Successful
        </h1>

        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your payment has been completed
          successfully.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
