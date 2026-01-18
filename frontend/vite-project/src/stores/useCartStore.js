import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import RecomendedProducts from "../components/RecomendedProducts";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,
  coupon: null,
  recomendedProducts: [],
  isCouponApplied: false,

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data.cartItems });
      get().calculateTotal(); // Calculate total when cart items are fetched
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message ||
          "Something went wrong in fetching cart items",
      );
    }
  },

  addToCart: async ({ product, size }) => {
    set({ loading: true });

    try {
      await axios.post("/cart", {
        productId: product._id,
        size: size ?? null,
        quantity: 1,
      });

      set((prev) => {
        const existingItem = prev.cart.find(
          (item) => item.productId === product._id && item.size === size,
        );

        let newCart;

        if (existingItem) {
          newCart = prev.cart.map((item) =>
            item.productId === product._id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          newCart = [
            ...prev.cart,
            {
              productId: product._id,
              product,
              size: size || null,
              quantity: 1,
            },
          ];
        }

        return { cart: newCart };
      });

      get().calculateTotal();
      toast.success("Product added to cart successfully");
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in adding to cart",
      );
    }
  },

  calculateTotal: async () => {
    const { cart, coupon, isCouponApplied } = get();

    const subTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    let total = subTotal;

    if (coupon && isCouponApplied) {
      const discount = subTotal * (coupon.discountPercentage / 100);
      total = subTotal - discount;
    }

    set({ subTotal, total });
  },

  removeAllFromCart: async (productId, size) => {
    set({ loading: true });
    try {
      await axios.delete("/cart", {
        data: { productId, size: size ?? null },
      });

      set((prev) => ({
        cart: prev.cart.filter(
          (item) =>
            !(
              item.productId === productId &&
              (item.size ?? null) === (size ?? null)
            ),
        ),
      }));

      get().calculateTotal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in removing from cart",
      );
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (productId, size, quantity) => {
    set({ loading: true });

    try {
      if (quantity <= 0) {
        await get().removeAllFromCart(productId, size ?? null);
        return;
      }

      await axios.patch(`/cart/${productId}`, {
        quantity,
        size: size ?? null,
      });

      set((prev) => ({
        cart: prev.cart.map((item) =>
          item.productId === productId && (item.size ?? null) === (size ?? null)
            ? { ...item, quantity }
            : item,
        ),
      }));

      get().calculateTotal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in updating quantity",
      );
    } finally {
      set({ loading: false });
    }
  },

  getRecommendedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/recommended");
      set({ recomendedProducts: res.data.products });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message ||
          "Something went wrong in fetching recommended products",
      );
    }
  },

  clearCart: async () => {
    try {
      await axios.delete("/cart/clear");
      set({ cart: [], subTotal: 0, total: 0, coupon: null });
    } catch (error) {
      toast.error(
        error.response.data.message || "Something went wrong in clearing cart",
      );
    }
  },

  getCoupon: async () => {
    try {
      const res = await axios.get("/coupon");
      set({ coupon: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong in fetching coupon",
      );
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axios.post("/coupon/validate", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotal();
      toast.success(res.data.message || "Coupon applied successfully");
    } catch (error) {
      set({ isCouponApplied: false });
      toast.error(
        error.response.data.message ||
          "Something went wrong in applying coupon",
      );
    }
  },

  removeCoupon: async () => {
    try {
      set({ coupon: null, isCouponApplied: false });
      get().calculateTotal();
      toast.success("Coupon removed successfully");
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong in removing coupon",
      );
    }
  },
}));
