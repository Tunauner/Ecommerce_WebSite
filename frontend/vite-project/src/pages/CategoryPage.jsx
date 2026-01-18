import { useParams } from "react-router-dom";
import CategoryCarts from "../components/CategoryCarts";

// MAN
import manJeans from "../assets/categories/jeans/manJeans.jpg";
import manShoes from "../assets/categories/shoes/manShoes.jpg";
import manTops from "../assets/categories/tops/manTops.jpg";
import manSuits from "../assets/categories/suits/manSuits.jpg";
import manGlasses from "../assets/categories/glasses/manGlasses.jpg";
import manBags from "../assets/categories/bags/manBags.jpg";
import manJackets from "../assets/categories/jackets/manJackets.jpg";

// WOMAN
import womanJeans from "../assets/categories/jeans/womanJeans.jpg";
import womanShoes from "../assets/categories/shoes/womanShoes.jpg";
import womanTops from "../assets/categories/tops/womanTops.jpg";
import womanSuits from "../assets/categories/suits/womanSuits.jpg";
import womanGlasses from "../assets/categories/glasses/womanGlasses.jpg";
import womanBags from "../assets/categories/bags/womanBags.jpg";
import womanJackets from "../assets/categories/jackets/womanJackets.jpg";

const CategoryPage = () => {
  const { gender } = useParams();

  const mancategories = [
    { href: "jeans", name: "Jeans", imageUrl: manJeans, size: "wide" },
    { href: "tops", name: "Tops", imageUrl: manTops, size: "normal" },
    { href: "shoes", name: "Shoes", imageUrl: manShoes, size: "tall" },
    { href: "jackets", name: "Jackets", imageUrl: manJackets, size: "normal" },
    { href: "suits", name: "Suits", imageUrl: manSuits, size: "wide" },
    { href: "bags", name: "Bags", imageUrl: manBags, size: "normal" },
    { href: "glasses", name: "Glasses", imageUrl: manGlasses, size: "tall" },
  ];

  const womencategories = [
    { href: "jeans", name: "Jeans", imageUrl: womanJeans, size: "wide" },
    { href: "tops", name: "Tops", imageUrl: womanTops, size: "normal" },
    { href: "shoes", name: "Shoes", imageUrl: womanShoes, size: "tall" },
    {
      href: "jackets",
      name: "Jackets",
      imageUrl: womanJackets,
      size: "normal",
    },
    { href: "suits", name: "Suits", imageUrl: womanSuits, size: "wide" },
    { href: "bags", name: "Bags", imageUrl: womanBags, size: "normal" },
    { href: "glasses", name: "Glasses", imageUrl: womanGlasses, size: "tall" },
  ];

  const categories = gender === "man" ? mancategories : womencategories;

  return (
    <div className="w-full px-4 lg:px-12 py-20">
      <h1 className="text-4xl font-semibold mb-24 uppercase tracking-widest">
        {gender === "man" ? "MAN" : "WOMAN"}
      </h1>

      <div className="flex flex-col gap-32">
        {categories.map((category) => (
          <CategoryCarts
            key={category.name}
            category={category}
            gender={gender}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
