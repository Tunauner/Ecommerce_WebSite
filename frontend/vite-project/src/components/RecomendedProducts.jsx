import React from "react";
import ProductCard from "./ProductCard";

const RecomendedProducts = ({ recomendedProducts }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-16">
        Recommended Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {recomendedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecomendedProducts;
