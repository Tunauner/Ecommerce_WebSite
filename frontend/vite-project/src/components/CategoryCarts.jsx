import { Link } from "react-router-dom";

const CategoryCarts = ({ category, gender }) => {
  const sizeClasses = {
    normal: "max-w-[1800px]",
    wide: "max-w-[1600px]",
    tall: "max-w-[1400px]",
  };

  return (
    <Link to={`/${gender}/category/${category.href}`} className="block w-full">
      {/* IMAGE */}
      <div className="w-full flex justify-center">
        <img
          src={category.imageUrl}
          alt={category.name}
          className={`
            w-full
            ${sizeClasses[category.size] || sizeClasses.normal}
            h-auto
            object-contain
          `}
        />
      </div>

      {/* TEXT */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-medium uppercase tracking-[0.25em] text-gray-900">
          {category.name}
        </h2>
      </div>
    </Link>
  );
};

export default CategoryCarts;
