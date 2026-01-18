import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const getProduct = useProductStore((state) => state.getProduct);
  const product = useProductStore((state) => state.product);
  const loading = useProductStore((state) => state.loading);

  const addToCart = useCartStore((s) => s.addToCart);
  const user = useUserStore((s) => s.user);

  // 🔹 UI state (key={id} sayesinde otomatik resetlenir)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const sizeRequired = product?.sizes?.length > 0;

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  /* ---------------- SELECTED IMAGE ---------------- */
  const selectedImage = useMemo(() => {
    return product?.images?.[selectedImageIndex];
  }, [product, selectedImageIndex]);

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    if (sizeRequired && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      product,
      size: sizeRequired ? selectedSize : null,
    });

   
  };

  if (loading || !product) {
    return (
      <div className="w-full py-20 text-center text-lg">Loading product...</div>
    );
  }

  return (
    <div key={id} className="w-full max-w-[1600px] mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_420px] gap-8">
        {/* ---------------- THUMBNAILS ---------------- */}
        <div className="hidden lg:flex flex-col gap-3">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`border ${
                selectedImageIndex === index
                  ? "border-black"
                  : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt="Product thumbnail"
                className="w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/*  MAIN IMAGE - */}
        <div className="w-full flex justify-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="max-h-[80vh] object-contain"
          />
        </div>

        {/*  PRODUCT INFO  */}
        <div className="lg:sticky lg:top-24 h-fit">
          <h1 className="text-lg font-medium">{product.name}</h1>

          <p className="text-base mt-2 font-semibold">{product.price} $</p>

          <p className="text-sm text-gray-600 mt-4">{product.description}</p>

          {/*  SIZE SELECT */}
          {sizeRequired && (
            <div className="mt-6">
              <p className="text-sm mb-2">Size</p>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border px-3 py-2 text-sm"
              >
                <option value="">Select a size</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/*  ACTION BUTTONS  */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 border py-3 text-sm">Style</button>

            <button
              onClick={handleAddToCart}
              disabled={sizeRequired && !selectedSize}
              className="flex-1 bg-black text-white py-3 text-sm disabled:opacity-40"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
