import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set, get) => ({
  products: [],
  product: null,
  loading: false,
  featuredProducts: [],

  setProducts: (products) => set({ products }),

  createProduct: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", formData, {
        timeout: 0,
      });

      set((prev) => ({
        products: [...prev.products, res.data.product],
      }));

      toast.success("Product created successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in creating product",
      );
    } finally {
      set({ loading: false });
    }
  },

  getProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ loading: false });
      set({ products: res.data.products });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message ||
          "Something went wrong in fetching products",
      );
    }
  },

  getProduct: async (id) => {
    set({ loading: true });
    try {
      // Eğer products boşsa önce doldur
      if (get().products.length === 0) {
        await get().getProducts();
      }

      const product = get().products.find((product) => product._id === id);

      set({ product, loading: false });
      console.log("product:", product);
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in fetching product",
      );
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/products/${id}`);
      set({ loading: false });
      set((prev) => ({
        products: prev.products.filter((product) => product._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message ||
          "Something went wrong in deleting product",
      );
    }
  },

  toogleFeatureProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${id}/`);
      set((prev) => ({
        products: prev.products.map((product) =>
          product._id === id ? res.data.product : product,
        ),
      }));
      set({ loading: false });
      toast.success("Product updated successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message ||
          "Something went wrong in updating product",
      );
    }
  },

  fetchProductsByCategory: async (category, gender) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);

      const filtered = gender
        ? res.data.products.filter((p) => p.gender === gender)
        : res.data.products;

      set({ products: filtered, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in fetching products",
      );
    }
  },

  getProductsByGender: (gender) =>
    get().products.filter((product) => product.gender === gender),

  getFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/featured");
      set({ loading: false });
      set({ featuredProducts: res.data.products });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message ||
          "Something went wrong in fetching products",
      );
    }
  },
}));
