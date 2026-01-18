import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import { Star, Trash } from "lucide-react";

const GetProducts = () => {
  const {
    products,
    getProducts,
    deleteProduct,
    toogleFeatureProduct,
    loading,
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 bg-white border border-gray-200 rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
        Products
      </h2>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1.5fr_1fr_1fr] border-b border-gray-200 pb-3 text-xs uppercase tracking-wide text-gray-500">
        <span>Product</span>
        <span className="text-center">Price</span>
        <span className="text-center">Category</span>
        <span className="text-center">Gender</span>
        <span className="text-center">Sizes</span>
        <span className="text-center">Featured</span>
        <span className="text-center">Actions</span>
      </div>

      {/* TABLE ROWS */}
      <div className="divide-y divide-gray-100">
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1.5fr_1fr_1fr] items-center py-4 text-sm"
          >
            {/* PRODUCT */}
            <div className="flex items-center gap-4">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-14 h-16 object-cover border"
              />
              <span className="text-gray-900 truncate">{product.name}</span>
            </div>

            {/* PRICE */}
            <span className="text-center text-gray-700">${product.price}</span>

            {/* CATEGORY */}
            <span className="text-center text-gray-700 capitalize">
              {product.category}
            </span>

            {/* GENDER */}
            <span className="text-center text-gray-700 capitalize">
              {product.gender}
            </span>

            {/* SIZES */}
            <div className="flex justify-center flex-wrap gap-1">
              {product.sizes?.length > 0 ? (
                product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-2 py-0.5 text-xs border border-gray-300 text-gray-700"
                  >
                    {size}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">—</span>
              )}
            </div>

            {/* FEATURED */}
            <div className="flex justify-center">
              <button
                disabled={loading}
                onClick={() => toogleFeatureProduct(product._id)}
                className={`p-2 border rounded-full transition
                  ${
                    product.isFeatured
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-600 hover:border-black"
                  }`}
              >
                <Star className="w-4 h-4" />
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-center">
              <button
                disabled={loading}
                onClick={() => deleteProduct(product._id)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetProducts;
