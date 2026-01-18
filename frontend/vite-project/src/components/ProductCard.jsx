import React, { memo } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = memo(({ product }) => {
  const user = useUserStore((s) => s.user);
  const addToCart = useCartStore((s) => s.addToCart);
  const navigate = useNavigate();

  const mainImage = product.images?.[0];
  const hoverImage = product.images?.[1];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    //  Size zorunluysa  detail page
    if (product.sizes && product.sizes.length > 0) {
      navigate(`/product/${product._id}`);
      return;
    }

    //  Size yoksa direkt sepete ekle
    addToCart({
      product,
      size: null,
    });
  };

  return (
    <div className="group w-full">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden bg-gray-100 aspect-[2/3.3]">
          <img
            src={mainImage}
            loading="lazy"
            decoding="async"
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />

          {hoverImage && (
            <img
              src={hoverImage}
              loading="lazy"
              decoding="async"
              alt={`${product.name} hover`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-bold">{product.name}</h3>
          <p className="text-sm text-gray-700 mt-1">${product.price}</p>
        </div>
      </Link>

      {/* ACTION */}
      <button
        onClick={handleAddToCart}
        className="
          mt-3 w-full
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-black text-white text-sm py-2
        "
      >
        {product.sizes?.length > 0 ? "Select Size" : "Add to Cart"}
      </button>
    </div>
  );
});

export default ProductCard;
