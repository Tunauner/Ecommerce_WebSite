import { Minus, Plus } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItems = ({ product }) => {
  const { removeAllFromCart, updateQuantity } = useCartStore();

  if (!product) return null;

  const image = product.images?.[0];

  const sizeValue =
    product.size !== undefined && product.size !== null ? product.size : null;

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex items-center justify-between gap-6">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="w-24 h-28 object-cover"
            />
          ) : (
            <div className="w-24 h-28 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-medium text-gray-900">
              {product.name}
            </h1>

            {sizeValue && (
              <p className="text-xs text-gray-500">
                Size: <span className="text-gray-900">{sizeValue}</span>
              </p>
            )}

            <button
              className="text-xs text-gray-500 hover:text-red-600 transition w-fit"
              onClick={() => removeAllFromCart(product._id, sizeValue)}
            >
              Remove
            </button>
          </div>
        </div>

        {/* QUANTITY */}
        <div className="flex items-center gap-3">
          <button
            className="border border-gray-300 w-8 h-8 flex items-center justify-center hover:border-black transition"
            onClick={() =>
              updateQuantity(product._id, sizeValue, product.quantity - 1)
            }
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="text-sm text-gray-900">{product.quantity}</span>

          <button
            className="border border-gray-300 w-8 h-8 flex items-center justify-center hover:border-black transition"
            onClick={() =>
              updateQuantity(product._id, sizeValue, product.quantity + 1)
            }
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* PRICE */}
        <div className="text-sm font-medium text-gray-900 min-w-[60px] text-right">
          ${product.price?.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
