import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { category, gender } = useParams();

  const fetchProductsByCategory = useProductStore(
    (state) => state.fetchProductsByCategory
  );
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);

  useEffect(() => {
    fetchProductsByCategory(category, gender);
  }, [category, gender, fetchProductsByCategory]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1400px] px-6 py-12 mx-auto">
        {loading && <p>Loading...</p>}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {/* GRID  */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
