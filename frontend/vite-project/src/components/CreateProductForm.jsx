import { Upload, Loader, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { toast } from "react-hot-toast";

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    gender: "",
    sizes: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = [
    "tops",
    "jeans",
    "shoes",
    "suits",
    "jackets",
    "bags",
    "glasses",
  ];

  const categoriesWithSizes = ["tops", "jeans", "shoes", "suits", "jackets"];
  const availableSizes = ["XS", "S", "M", "L", "XL"];

  const { loading, createProduct } = useProductStore();

  const toggleSize = (size) => {
    setNewProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const uploadImagesHandler = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImageFiles(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      categoriesWithSizes.includes(newProduct.category) &&
      newProduct.sizes.length === 0
    ) {
      toast.error("Please select at least one size");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}[]`, v));
      } else {
        formData.append(key, value);
      }
    });

    imageFiles.forEach((file) => formData.append("images", file));

    await createProduct(formData);

    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      gender: "",
      sizes: [],
    });
    setImageFiles([]);
    setImagePreviews([]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-8">
        New Product
      </h2>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Product Name</label>
          <input
            className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            rows={3}
            className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2 resize-none"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="text-sm text-gray-600">Price</label>
          <input
            type="number"
            className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />
        </div>

        {/* CATEGORY & GENDER */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                  sizes: [],
                })
              }
              required
            >
              <option value="" disabled>
                Select
              </option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <select
              className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent"
              value={newProduct.gender}
              onChange={(e) =>
                setNewProduct({ ...newProduct, gender: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="woman">Woman</option>
              <option value="man">Man</option>
            </select>
          </div>
        </div>

        {/* SIZES */}
        {categoriesWithSizes.includes(newProduct.category) && (
          <div>
            <label className="text-sm text-gray-600 block mb-2">Sizes</label>
            <div className="flex gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-1 border text-sm ${
                    newProduct.sizes.includes(size)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* IMAGES */}
        <div>
          <label className="text-sm text-gray-600 block mb-2">Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            id="images"
            className="hidden"
            onChange={uploadImagesHandler}
          />

          <label
            htmlFor="images"
            className="inline-flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 cursor-pointer hover:border-black"
          >
            <Upload className="w-4 h-4" />
            Upload images
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {imagePreviews.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-24 object-cover border"
                  alt="preview"
                />
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 border border-black py-3 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition"
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4" />
          )}
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
